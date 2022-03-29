# import requests
# import zipfile
from inspect import modulesbyfile
import pymysql
import xml.etree.ElementTree as elemTree


host = "localhost"
port = 3306
database = "opendart"
username = "root"
password = "kimchan8855"

conn = pymysql.connect(host=host, user=username, passwd=password, db=database, port=port, use_unicode=True, charset='utf8')
cursor = conn.cursor()


tree = elemTree.parse('CORPCODE.xml')
root = tree.getroot()

for i in root:
    stock_code = i.findtext("stock_code")
    corp_name = i.findtext("corp_name")
    modify_date = i.findtext("modify_date")
    corp_code = i.findtext("corp_code")
    stock_code = stock_code.strip()
    if stock_code: 
        query = "INSERT INTO corpCode(corp_name, stock_code, modify_date, corp_code) VALUES(%s, %s, %s,%s)"
        val = (corp_name, stock_code, modify_date, corp_code)
        cursor.execute(query, val)
print('끝!')

# for i in root:
#     corp_name = i.findtext("corp_name")
#     stock_code = i.findtext("stock_code")
#     stock_code = stock_code.strip()
#     if stock_code == "289220":
#         for j in i:
#             print(j.tag, " : ", j.text)
#     break;  

conn.commit()
conn.close()
        
        
 
# file = open("corpcode.csv", mode="w")
# writer = csv.writer(file)
# writer.writerow(["corp_code", "corp_name", "stock_code", "modify_date"])
# for country in root.iter("list"):
 
#     stock_code = country.findtext("stock_code")
#     stock_code = stock_code.strip()
 
#     if stock_code:
#         country_dic = {
#             "corp_code": country.findtext("corp_code"),
#             "corp_name": country.findtext("corp_name"),
#             "stock_code": country.findtext("stock_code"),
#             "modify_date": country.findtext("modify_date"),
#         }
#         writer.writerow(list(country_dic.values()))
