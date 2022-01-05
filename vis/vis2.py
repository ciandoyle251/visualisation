import pymongo
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

db = client.classDB
with open('./vis/data2.csv', 'w+') as f:
    f.write('User,RepoCount\n')
    dct = db.githubuser.find()
    for user in dct:
        #pprint.pprint(user)
        print()
        f.write(user['user'] + ',' + str(user['no.Repos']) + '\n')