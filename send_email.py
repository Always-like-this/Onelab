# __author:Administrator
# date:2019/3/21
import smtplib
from email.header import Header
from email.mime.text import MIMEText

# 第三方 SMTP 服务
mail_host = "smtp.qq.com"  # SMTP服务器
mail_user = "1772635346@qq.com"  # 用户名
mail_pass = "legdkgptnvhaebgh"

# 授权密码，非登录密码

sender = '1772635346@qq.com'  # 发件人邮箱(最好写全, 不然会失败)
# receiver = '2657344219@qq.com'  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱   #只能单发

title = 'Python原生Header方法邮件发送测试'  # 邮件主题
# content = '此账号仅供测试，请大神们不要修改邮箱密码。'  # 内容


# SMTP服务器  # 登陆       #密码       #发送给谁   #主题     #内容
def send_email2(SMTP_host, from_account, from_passwd, to_account, subject, content):
    email_client = smtplib.SMTP(SMTP_host)  # SMTP服务器
    email_client.login(from_account, from_passwd)  # SMTP服务器 登陆  #密码
    # create msg
    msg = MIMEText(content, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')  # subject   #邮件头（主题  ）#一定要用Header格式化
    msg['From'] = from_account  # 内容 字符串
    msg['To'] = to_account  # 发送给谁 字符串
    email_client.sendmail(from_account, to_account, msg.as_string())  # 发送模式

    print("邮件发送成功！注意查收！！！垃圾箱！！！反垃圾拦截！！")
    email_client.quit()  # 退出


# SMTP服务器  # 用户名  # 密码  # 接收   # 主题   #内容
def send_email(receiver, content):
    send_email2(mail_host, mail_user, mail_pass, receiver, title, content)  # 调用实例化
# if __name__ == '__main__':
#                  # SMTP服务器  # 用户名  # 密码  # 接收   # 主题   #内容
#     send_email2(mail_host, mail_user, mail_pass, receiver, title, content) #调用实例化
