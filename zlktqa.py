# encoding: utf-8
from flask import Flask, render_template, request, redirect, url_for, session, g
import config
from models import User, Question, Answer, Status, Type, Logged, Comment, History, Backgroud, Permission
from exts import db
from decorators import login_required
from sqlalchemy import or_
from send_email import send_email
app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)


@app.route('/')
@login_required
def index():
    context = {
        'questions': Question.query.order_by('create_time').all(),
        'backgroud': Backgroud.query.filter(Backgroud.author == g.user).first(),
        'permission': Permission.query.filter(Permission.author_id == g.user.id).first(),

    }
    return render_template('index.html', **context)


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        telephone = request.form.get('telephone')
        password = request.form.get('password')
        user = User.query.filter(User.telephone == telephone).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            # 如果想在31天内都不需要登录
            session.permanent = True
            return redirect(url_for('index'))
        else:
            return u'手机号码或者密码错误，请确认后再登录！'


@app.route('/regist/', methods=['GET', 'POST'])
def regist():
    if request.method == 'GET':
        return render_template('regist.html')
    else:
        telephone = request.form.get('telephone')
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        # 手机号码验证，如果被注册了，就不能再注册了
        user = User.query.filter(User.telephone == telephone).first()
        if user:
            return u'该手机号码已被注册，请更换手机号码！'
        else:
            # password1要和password2相等才可以
            if password1 != password2:
                return u'两次密码不相等，请核对后再填写！'
            else:
                user = User(telephone=telephone, username=username, password=password1)
                db.session.add(user)
                db.session.commit()
                user = User.query.filter(User.telephone == telephone).first()
                user_id = user.id
                permission = Permission(author_id=user_id, permission='common')
                db.session.add(permission)
                db.session.commit()
                # 如果注册成功，就让页面跳转到登录的页面
                return redirect(url_for('login'))


@app.route('/check_login/', methods=['GET', 'POST'])
def check_login():
    telephone = request.form.get('user')
    password = request.form.get('pwd')
    user = User.query.filter(User.telephone == telephone).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        # 如果想在31天内都不需要登录
        session.permanent = True
        return '1'
        return redirect(url_for('index'))
    else:
        return '2'


@app.route('/update_password/', methods=['POST'])
@login_required
def update_password():
    password = request.form.get('password')
    try:
        user = User.query.filter(User.id == g.user.id).first()
        user.password = user.new_password(password)
        db.session.add(user)
        db.session.commit()
        return '1'
    except:
        return '0'


@app.route('/edit_info/', methods=['GET', 'POST'])
@login_required
def edit_info():
    permission = Permission.query.filter(Permission.author_id == g.user.id).first()
    if request.method == 'GET':
        backgroud = Backgroud.query.filter(Backgroud.author == g.user).first()
        user = User.query.filter(User.id == g.user.id).first()
        return render_template('user.html', user=user, backgroud=backgroud,permission=permission)
    else:
        user_key = request.form.get('user_key')
        user_value = request.form.get('user_value')
        user1 = User.query.filter(User.id == g.user.id).first()
        try:

            if user_key == 'email':
                user2 = User.query.filter(User.email == user_value).first()
                if user_value != user1.email and user2:
                    return '2'
                if user_value != user1.email:
                    user1.email = user_value
                    user1.validate = 0
                    db.session.add(user1)
                    db.session.commit()
                    return '1'
            elif user_key == 'telephone':
                user2 = User.query.filter(User.telephone == user_value).first()
                if user_value != user1.telephone and user2:
                    return '2'
                if user_value != user1.telephone:
                    user1.telephone = user_value
                    db.session.add(user1)
                    db.session.commit()
                    return '1'
            elif user_key == "username":
                if user1.username != user_value:
                    user1.username = user_value
                    db.session.add(user1)
                    db.session.commit()
                    return '1'
        except:
            return '0'


@app.route('/update_title/', methods=['POST'])
def update_title():
    title = request.form.get('title')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        old_value = question.title
        if old_value != title:
            question.title = title
            db.session.add(question)
            db.session.commit()
            key = "标题"
            new_value = title
            log(key, question, old_value, new_value)
        return '1'
    except:
        return '0'


@app.route('/update_assignee/', methods=['POST'])
def update_assignee():
    assignee = request.form.get('assignee')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        old_assignee = question.assignee
        question.assignee = assignee
        if question.status_id == 7:
            question.status_id = 1
        db.session.add(question)
        db.session.commit()
        key = "开发者"
        old_value = old_assignee
        new_value = assignee
        if old_value != new_value:
            log(key, question, old_value, new_value)
        return '1'
    except:
        return '0'


@app.route('/update_time/', methods=['POST'])
def update_time():
    estimated = request.form.get('estimated')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        log = question.log
        question.estimated = estimated
        remaining = int(estimated) - int(log)

        if remaining < 0:
            question.remaining = 0
        else:
            question.remaining = remaining
        db.session.add(question)
        db.session.commit()
        return '1'
    except:
        return '0'


@app.route("/update_type/", methods=["POST"])
def update_type():
    type_name = request.form.get('type')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        old_value = question.type.type
        type = Type.query.filter(Type.type == type_name).first()
        question.type_id = type.id
        db.session.add(question)
        db.session.commit()
        key = "类型"
        new_value = type_name
        if old_value != new_value:
            log(key, question, old_value, new_value)
        return '1'
    except:
        return '0'


@app.route("/update_content/", methods=["POST"])
def update_content():
    task_content = request.form.get('task_content')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        old_value = question.content
        question.content = task_content
        db.session.add(question)
        db.session.commit()
        key = '任务描述'
        new_value = task_content
        if old_value != new_value:
            log(key, question, old_value, new_value)
        return '1'
    except:
        return '0'


@app.route('/add_comments/', methods=['POST'])
def add_comments():
    comments = request.form.get('comments')
    question_id = request.form.get('question_id')
    try:
        comment = Comment(comment=comments)
        question = Question.query.filter(Question.id == question_id).first()
        comment.question = question
        comment.author = g.user
        db.session.add(comment)
        db.session.commit()
        return '1'
    except:
        return '0'


@app.route("/update_backgroud/", methods=['POST'])
@login_required
def update_backgroud():
    back_color = request.form.get('backgroud')
    try:
        backgroud = Backgroud.query.filter(Backgroud.author == g.user).first()
        if backgroud:
            # backgroud = Backgroud(style_color=back_color)
            backgroud.style_color = back_color
        else:
            backgroud = Backgroud(style_color=back_color)
            backgroud.author = g.user
        db.session.add(backgroud)
        db.session.commit()
        return '1'
    except:
        return '0'


@app.route('/add_log/', methods=['POST'])
def add_log():
    log_time = request.form.get('log')
    question_id = request.form.get('question_id')
    try:
        log = Logged(log=log_time)
        question = Question.query.filter(Question.id == question_id).first()
        log.question = question
        log.author = g.user
        db.session.add(log)
        db.session.commit()
        question.log = int(log_time) + int(question.log)
        remaining = int(question.estimated)-int(question.log)
        if remaining < 0:
            question.remaining = 0
        else:
            question.remaining = remaining
        db.session.add(question)
        db.session.commit()
        return '1'
    except:
        return '0'


@app.route('/update_status/', methods=['POST'])
def update_status():
    status_name = request.form.get('status')
    question_id = request.form.get('question_id')
    try:
        question = Question.query.filter(Question.id == question_id).first()
        old_value = question.status.status
        status = Status.query.filter(Status.status == status_name).first()
        question.status_id = status.id
        db.session.add(question)
        db.session.commit()
        key = "状态"
        new_value = status_name
        log(key, question, old_value, new_value)
        return '1'
    except:
        return '0'


@app.route('/check_regist/', methods=['GET', 'POST'])
def check_regist():
    telephone = request.form.get('user')
    user = User.query.filter(User.telephone == telephone).first()
    if user:
        return '1'
    else:
        return '0'


@app.route('/logout/')
def logout():
    # session.pop('user_id')
    # del session['user_id']
    session.clear()
    return redirect(url_for('login'))


@app.route('/question/', methods=['GET', 'POST'])
@login_required
def question():
    permission = Permission.query.filter(Permission.author_id == g.user.id).first()
    if permission.permission == 'admin' or permission.permission == 'update':
        if request.method == 'GET':
            types = Type.query.all()
            backgroud_model = Backgroud.query.filter(Backgroud.author == g.user).first()
            return render_template('question.html', types=types, backgroud=backgroud_model,permission=permission)
        else:
            title = request.form.get('title')
            content = request.form.get('content')
            type = request.form.get('type')
            assginee = request.form.get('assginee')
            question = Question(title=title, content=content)
            type = Type.query.filter(Type.type == type).first()
            estimated = request.form.get('estimated')
            if estimated:
                question.estimated = estimated
                question.remaining = estimated
            if assginee:
                question.assignee = assginee
                question.status_id = 1
            else:
                question.status_id = 7
            question.log = 0
            question.type_id = type.id
            question.author = g.user
            question.reporter = g.user.username
            db.session.add(question)
            db.session.commit()
            return redirect(url_for('index'), permission=permission)
    else:
        return "您没有权限创建任务，请联系管理员"


@app.route('/detail/<question_id>/')
@login_required
def detail(question_id):
    permission = Permission.query.filter(Permission.author_id == g.user.id).first()
    backgroud_model = Backgroud.query.filter(Backgroud.author == g.user).first()
    question_model = Question.query.filter(Question.id == question_id).first()
    type_model = Type.query.all()
    # user = User.query.filter(User.id == g.user.id).first()
    if permission.permission == 'admin' or permission.permission=='update':
        return render_template('detail.html', question=question_model, type=type_model, backgroud=backgroud_model,permission=permission)
    else:
        return render_template('common_detail.html', question=question_model, type=type_model, permission=permission, backgroud=backgroud_model)


@app.route('/update_permission/', methods=['GET', 'POST'])
@login_required
def update_permission():
    permission_all = Permission.query.all()
    permission = Permission.query.filter(Permission.author_id == g.user.id).first()
    backgroud_model = Backgroud.query.filter(Backgroud.author == g.user).first()
    if request.method == 'GET':
        return render_template('permission.html', backgroud=backgroud_model, permission_all=permission_all,permission=permission)
    else:
        user_id = request.form.get('user_id')
        permissiom_value = request.form.get('permission_value')
        if int(user_id) == g.user.id:
            return '2'
        try:
            permission = Permission.query.filter(Permission.author_id == user_id).first()
            permission.permission = permissiom_value
            db.session.add(permission)
            db.session.commit()
            return '1'
        except:
            return '0'


@app.route('/search/')
def search():
    permission = Permission.query.filter(Permission.author_id == g.user.id).first()
    q = request.args.get('q')
    # title,content
    # 或
    # condition = or_(Question.title.contains(q),Question.content.contains(q))
    # questions = Question.query.filter(condition).order_by('-create_time')
    # 与
    questions = Question.query.filter(Question.title.contains(q))
    backgroud_model = Backgroud.query.filter(Backgroud.author == g.user).first()
    return render_template('index.html', questions=questions, q=q, backgroud=backgroud_model, permission=permission)


@app.before_request
def my_before_request():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        if user:
            g.user = user


@app.context_processor
def my_context_processor():
    if hasattr(g, 'user'):
        return {'user': g.user}
    return {}

# before_request -> 视图函数 -> context_processor


def log(key, question, old_value, new_value):
    history = History(option='更改', key=key, old_value=old_value, new_value=new_value)
    history.author = g.user
    history.question = question
    db.session.add(history)
    db.session.commit()


if __name__ == '__main__':
    app.run()
