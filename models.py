#encoding: utf-8

from exts import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    telephone = db.Column(db.String(11), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50))
    validate = db.Column(db.Integer)

    def __init__(self,*args, **kwargs):
        telephone = kwargs.get('telephone')
        username = kwargs.get('username')
        password = kwargs.get('password')

        self.telephone = telephone
        self.username = username
        self.password = generate_password_hash(password)

    def check_password(self, raw_password):
        result = check_password_hash(self.password, raw_password)
        return result

    def new_password(self,password):
        result = generate_password_hash(password)
        return result


class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'))
    type = db.relationship('Type', backref=db.backref('questions'))
    status_id = db.Column(db.Integer, db.ForeignKey('status.id'))
    status = db.relationship('Status', backref=db.backref('questions'))
    reporter = db.Column(db.String(50))
    assignee = db.Column(db.String(50))
    content = db.Column(db.Text, nullable=False)
    estimated = db.Column(db.Float)
    remaining = db.Column(db.Float)
    log = db.Column(db.Float)
    # now()获取的是服务器第一次运行的时间
    # now就是每次创建一个模型的时候，都获取当前的时间
    create_time = db.Column(db.DateTime, default=datetime.now)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    author = db.relationship('User', backref=db.backref('questions'))


class Status(db.Model):
    __tablename__ = 'status'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(20), nullable=False)


class Type(db.Model):
    __tablename__ = 'type'
    id = db.Column(db.Integer,  primary_key=True, autoincrement=True)
    type = db.Column(db.String(10), nullable=False)


class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question = db.relationship('Question', backref=db.backref('answers', order_by=id.desc()))
    author = db.relationship('User', backref=db.backref('answers'))


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # task_id = db.Column(db.Integer, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    comment = db.Column(db.Text, nullable=False)
    question = db.relationship('Question', backref=db.backref('comments', order_by=id.desc()))
    author = db.relationship('User', backref=db.backref('comments'))


class Logged(db.Model):
    __tablename__ = 'logged'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # task_id = db.Column(db.Integer, nullable=False)
    log = db.Column(db.Float, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question = db.relationship('Question', backref=db.backref('loggeds', order_by=id.desc()))
    author = db.relationship('User', backref=db.backref('loggeds'))
    # username = db.Column(db.String(50), nullable=False)


class History(db.Model):
    __tablename__ = 'history'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # task_id = db.Column(db.Integer, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # username = db.Column(db.String(50), nullable=False)
    option = db.Column(db.String(50), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    key = db.Column(db.String(30), nullable=False)
    old_value = db.Column(db.Text)
    new_value = db.Column(db.Text)
    question = db.relationship('Question', backref=db.backref('historys', order_by=id.desc()))
    author = db.relationship('User', backref=db.backref('historys'))


class Backgroud(db.Model):
    __tablename__ = 'bcakgroud'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    style_color = db.Column(db.String(30), nullable=False)
    author = db.relationship('User', backref=db.backref('backgrouds'))


class Permission(db.Model):
    __tablename__ = 'permission'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    permission = db.Column(db.String(50), nullable=False)
    author = db.relationship('User', backref=db.backref('permission'))
