import json
import pymongo
import io
import os
from github import Github
from faker import Faker
from collections import defaultdict

faker = Faker()
names = defaultdict(faker.name)
# First create a Github instance:

# f = open("data2.csv")

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn) 
db = client.classDB
# using an access token
g = Github("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")

# Github Enterprise with custom hostname
usr = g.get_user()
# Then play with your Github objects:
fc = usr.following
print("following: " + str(fc))
fl = usr.get_following()
for f in fl:
    dct = {
        "user": names[f.login].replace(" ",""),
        "fullname": names[f.name],
        "location": f.location,
        "no.Repos":  f.public_repos,
        "company": f.company 
    }
    for k, v in dict(dct).items():
        if v is None:
            del dct[k]
    print(f.name, + f.public_repos,"\n")
    db.githubuser.insert_many([dct])
# for repo in g.get_user().get_repos():
#     print(repo.name)
print(dct)
db = client.classDB