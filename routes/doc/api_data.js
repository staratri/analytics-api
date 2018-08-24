define({ "api": [
  {
    "type": "post",
    "url": "/accounts/insta",
    "title": "Adds Insta account",
    "version": "0.0.1",
    "name": "Adds_Accounts",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"Iron_man\",\n\t\t\tprofilePicture: \"https://ironmark32.jpg\",\n\t\t\tname: \"Iron Man\",\n\t\t\tbio: \"Save the world\",\n\t\t\tisBusiness: false,\n\t\t\tuserId: \"12333132\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72\"\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"User Denied from Authentication\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/accounts",
    "title": "Gets added account",
    "version": "0.0.1",
    "name": "GetAccounts",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Selected account.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"Iron_man\",\n\t\t\tprofilePicture: \"https://ironmark32.jpg\",\n\t\t\tname: \"Iron Man\",\n\t\t\tbio: \"Save the world\",\n\t\t\tisBusiness: false,\n\t\t\tuserId: \"12333132\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72\"\n\t\t}\n\t\t{\n\t\t\tinstaId: \"2397hyuew7yq\",\n\t\t\tusername: \"thor_2121\",\n\t\t\tprofilePicture: \"https://somthingBat.jpg\",\n\t\t\tname: \"King Thor\",\n\t\t\tbio: \"power of thunder\",\n\t\t\tisBusiness: true,\n\t\t\tuserId: \"23985637\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"No accounts added\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "Accounts"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_anil_Documents_analytiks_io_api_routes_doc_main_js",
    "groupTitle": "_home_anil_Documents_analytiks_io_api_routes_doc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/media/comments/count",
    "title": "Adds custom comments count to media",
    "version": "0.0.1",
    "name": "Adds_custom_comments",
    "group": "comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaId",
            "description": "<p>custom media id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>custom user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>custom number of comments.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t\tmediaId : \"a23k8fhd8u4jkfd\",\n\t\t\tuserId : 3873465223,\n\t\t\tcount: 21\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ParamsNotFound",
            "description": "<p>Some fields not provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"some params missing\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "comments"
  },
  {
    "type": "post",
    "url": "/comments",
    "title": "fetches comments on posts of selected user",
    "version": "0.0.1",
    "name": "comments",
    "group": "comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaId",
            "description": "<p>selected media id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tcomment : \"Avengers attack\",\n\t\t\tcommentId : 1787953423947018748,\n\t\t\tcreatedAt : \"15/02/2018 11:55:25\",\n\t\t\tfullName : \"tony stark\",\n\t\t\timage : \"<div style=\"max-width: 25%;\"><img src=\"https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\" class=\"img-thumbnail\"></div>\",\n\t\t\tmediaId : \"149781320536323708_3536728175\",\n\t\t\tprofilePicture : \"https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\",\n\t\t\ttime : \"1493130809\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:25.041Z\",\n\t\t\tuserId : \"32367128175\"\n\t\t\tuserName : \"iron_man\",\n\t\t\t__v :0,\n\t\t\t_id : \"5a8527d55iuhf730dc4cce326\"\n\t\t}\n\t\t{\n\t\t\tcomment : \"now its time to defend\",\n\t\t\tcommentId : 178795234347018748,\n\t\t\tcreatedAt : \"15/02/2018 11:55:25\",\n\t\t\tfullName : \"Steve Rogers\",\n\t\t\timage : \"<div style=\"max-width: 25%;\"><img src=\"https://scontent.cdninstagram.com/vp/986rc77c31bba12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\" class=\"img-thumbnail\"></div>\",\n\t\t\tmediaId : \"14978132051555423708_3536728175\",\n\t\t\tprofilePicture : \"https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5TY4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\",\n\t\t\ttime : \"1493130809\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:25.041Z\",\n\t\t\tuserId : \"3598728175\"\n\t\t\tuserName : \"cation_america\",\n\t\t\t__v :0,\n\t\t\t_id : \"5a8527238991a30dc4cce326\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the media was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"media Id not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "comments"
  },
  {
    "type": "post",
    "url": "/media/followers/count",
    "title": "Adds custom followers count",
    "version": "0.0.1",
    "name": "Adds_custom_followers",
    "group": "followers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>custom user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mediaId",
            "description": "<p>custom media id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t\tuserId : 3873465223,\n\t\t\tcount: 21\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ParamsNotFound",
            "description": "<p>Some fields not provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"some params missing\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "followers"
  },
  {
    "type": "post",
    "url": "/followers",
    "title": "fetches followers list of selected user",
    "version": "0.0.1",
    "name": "followers",
    "group": "followers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instaId",
            "description": "<p>instagram user id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"Big_hulk\",\n\t\t\tprofilePicture: \"https://hulksmash.jpg\",\n\t\t\tname: \"Dr Banner\",\n\t\t\tuserId: \"12333132\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72\"\n\t\t}\n\t\t{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"thor_2121\",\n\t\t\tprofilePicture: \"https://somthingBat.jpg\",\n\t\t\tname: \"King Thor\",\n\t\t\tuserId: \"23985637\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"user Id not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "followers"
  },
  {
    "type": "post",
    "url": "/follows",
    "title": "fetches follows list of selected user",
    "version": "0.0.1",
    "name": "follows",
    "group": "follows",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instaId",
            "description": "<p>instagram user id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"Big_hulk\",\n\t\t\tprofilePicture: \"https://hulksmash.jpg\",\n\t\t\tname: \"Dr Banner\",\n\t\t\tuserId: \"12333132\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72\"\n\t\t}\n\t\t{\n\t\t\tinstaId: \"1243jkh234df\",\n\t\t\tusername: \"thor_2121\",\n\t\t\tprofilePicture: \"https://somthingBat.jpg\",\n\t\t\tname: \"King Thor\",\n\t\t\tuserId: \"23985637\",\n\t\t\taccessToken: \"afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"user Id not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "follows"
  },
  {
    "type": "post",
    "url": "/media/likes/count",
    "title": "Adds custom likes count to media",
    "version": "0.0.1",
    "name": "Adds_custom_likes",
    "group": "likes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaId",
            "description": "<p>custom media id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>custom user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>custom likes count.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t\tmediaId : \"a23k8fhd8u4jkfd\",\n\t\t\tuserId : 3873465223,\n\t\t\tcount: 21\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ParamsNotFound",
            "description": "<p>Some fields not provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"some params missing\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "likes"
  },
  {
    "type": "post",
    "url": "/likes",
    "title": "fetches likes on posts of selected user",
    "version": "0.0.1",
    "name": "likes",
    "group": "likes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaId",
            "description": "<p>selected media id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tcreatedAt : \"15/02/2018 11:55:25\",\n\t\t\tfullName : \"tony stark\",\n\t\t\timage : \"<div style=\"max-width: 25%;\"><img src=\"https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\" class=\"img-thumbnail\"></div>\",\n\t\t\tmediaId : \"149781320536323708_3536728175\",\n\t\t\tpreviewImage : \"https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:25.041Z\",\n\t\t\tuserId : \"32367128175\"\n\t\t\tuserName : \"iron_man\",\n\t\t\t__v :0,\n\t\t\t_id : \"5a8527d55iuhf730dc4cce326\"\n\t\t}\n\t\t{\n\t\t\tcreatedAt : \"15/02/2018 11:55:25\",\n\t\t\tfullName : \"Bruce Banner\",\n\t\t\timage : \"<div style=\"max-width: 25%;\"><img src=\"https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\" class=\"img-thumbnail\"></div>\",\n\t\t\tmediaId : \"149781320536323708_3536728175\",\n\t\t\tpreviewImage : \"https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:25.041Z\",\n\t\t\tuserId : \"32367128175\"\n\t\t\tuserName : \"hulk_green\",\n\t\t\t__v :0,\n\t\t\t_id : \"5a8527d55iuhf730dc4cce326\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the media was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"media Id not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "likes"
  },
  {
    "type": "post",
    "url": "/media/media/count",
    "title": "Adds custom media count to media",
    "version": "0.0.1",
    "name": "Adds_custom_media",
    "group": "posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mediaId",
            "description": "<p>custom media id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>custom user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "likesCount",
            "description": "<p>custom number of likes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "commentsCount",
            "description": "<p>custom number of comments.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t{\n\t\t\tmediaId : \"245rr43rhh5f336hyhb33\",\n\t\t\tuserId : \"234422112344\",\n\t\t\tlikesCount:101,\n\t\t\tcommentsCount: 35\t\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ParamsNotFound",
            "description": "<p>Some fields not provided.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"some params missing\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "posts"
  },
  {
    "type": "post",
    "url": "/posts",
    "title": "fetches posts of selected user",
    "version": "0.0.1",
    "name": "posts",
    "group": "posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authtoken",
            "description": "<p>Authentication token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instaId",
            "description": "<p>instagram user id.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n\t\t[{\n\t\t\tcreatedAt : \"2018-02-15T06:25:23.446Z\",\n\t\t\tcarouselMedia : Array(0),\n\t\t\tcommentsCount : 0,\n\t\t\tcreatedTime : 1496766593,\n\t\t\tfilter : \"Hudson\",\n\t\t\tinstaId : \"353672812175\",\n\t\t\tlikes : 38,\n\t\t\tlink : \"https://www.instagram.com/p/BVAT9DTYNBJM9B-x7/\",\n\t\t\tlocation : Object,\n\t\t\tmediaId : \"1531311632322433915451_3536728175\",\n\t\t\tpreviweImage : Object,\n\t\t\ttags : Array(5),\n\t\t\ttype : \"image\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:23.446Z\",\n\t\t\tuserHasLiked : false,\n\t\t\tusersInPhotos : Array(0),\n\t\t\t__v : 0,\n\t\t\t_id : \"5a852r37d35091a30dc4cce307\"\n\t\t}\n\t\t{\n\t\t\tcreatedAt : \"2018-02-15T06:25:23.446Z\",\n\t\t\tcarouselMedia : Array(0),\n\t\t\tcommentsCount : 0,\n\t\t\tcreatedTime : 1496766593,\n\t\t\tfilter : \"Hudson\",\n\t\t\tinstaId : \"35367281275\",\n\t\t\tlikes : 38,\n\t\t\tlink : \"https://www.instagram.com/p/BVUIYGUAT9D9B-x7/\",\n\t\t\tlocation : Object,\n\t\t\tmediaId : \"1531311223632322915451_3536728175\",\n\t\t\tpreviweImage : Object,\n\t\t\ttags : Array(5),\n\t\t\ttype : \"image\",\n\t\t\tupdatedAt : \"2018-02-15T06:25:23.446Z\",\n\t\t\tuserHasLiked : false,\n\t\t\tusersInPhotos : Array(0),\n\t\t\t__v : 0,\n\t\t\t_id : \"5a8527d35093e1a30dc4cce307\"\n\t\t}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"user Id not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "posts"
  }
] });
