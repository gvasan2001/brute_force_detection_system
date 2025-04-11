import pymysql
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class data_base:
    def __init__(self):
        self.conn=pymysql.connect(user = "root",
                                  host = "localhost",
                                  password = "123",
                                  database = "boat_price_pridection",
                                  charset = "utf8")

    def register(self, qry):
        con = self.conn
        curses = con.cursor()
        curses.execute(qry)
        con.commit()
        return "null"

    def show(self,qry):
        con = self.conn
        curses= con.cursor()
        curses.execute(qry)
        data=curses.fetchall()
        return data

    def delete(self, qry):
        con = self.conn
        curses = con.cursor()
        curses.execute(qry)
        con.commit()
        con.close()
        return "null"
    def send_email( receiver_email, body):
    # Create a multipart message
        msg = MIMEMultipart()
        msg['From'] = "gokulavasan640@gmail.com"
        msg['To'] = receiver_email
        msg['Subject'] = 'Credit card OTP'

    # Attach the email body to the message
        msg.attach(MIMEText(body, 'plain'))

        try:
        # Connect to the server and login
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()  # Enable security (TLS)
            server.login('gokulavasan640@gmail.com', "xvao kbab zjqi ffzh")

        # Send the email
            server.sendmail("gokulavasan640@gmail.com", receiver_email, msg.as_string())
            return "Email sent successfully!"

        except Exception as e:
            return "Error: Unable to send email."

        finally:
            server.quit()

