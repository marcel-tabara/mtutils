export const nextSeo = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/NextSeoProps",
  "definitions": {
      "NextSeoProps": {
          "type": "object",
          "properties": {
              "title": {
                  "type": "string"
              },
              "titleTemplate": {
                  "type": "string"
              },
              "noindex": {
                  "type": "boolean"
              },
              "nofollow": {
                  "type": "boolean"
              },
              "description": {
                  "type": "string"
              },
              "canonical": {
                  "type": "string"
              },
              "mobileAlternate": {
                  "type": "object",
                  "properties": {
                      "media": {
                          "type": "string"
                      },
                      "href": {
                          "type": "string"
                      }
                  },
                //   "required": [
                //       "media",
                //       "href"
                //   ],
                  "additionalProperties": false
              },
              "languageAlternates": {
                  "type": "array",
                  "items": {
                      "type": "object",
                      "properties": {
                          "hrefLang": {
                              "type": "string"
                          },
                          "href": {
                              "type": "string"
                          }
                      },
                      "required": [
                          "hrefLang",
                          "href"
                      ],
                      "additionalProperties": false
                  }
              },
              "openGraph": {
                  "$ref": "#/definitions/OpenGraph"
              },
              "facebook": {
                  "type": "object",
                  "properties": {
                      "appId": {
                          "type": "string"
                      }
                  },
                //   "required": [
                //       "appId"
                //   ],
                  "additionalProperties": false
              },
              "twitter": {
                  "$ref": "#/definitions/Twitter"
              },
              "additionalMetaTags": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/MetaTag"
                  }
              }
          },
          "additionalProperties": false
      },
      "OpenGraph": {
          "type": "object",
          "properties": {
              "url": {
                  "type": "string"
              },
              "type": {
                  "type": "string"
              },
              "title": {
                  "type": "string"
              },
              "description": {
                  "type": "string"
              },
              "images": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/OpenGraphImages"
                  }
              },
              "videos": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/OpenGraphVideos"
                  }
              },
              "defaultImageHeight": {
                  "type": "number"
              },
              "defaultImageWidth": {
                  "type": "number"
              },
              "locale": {
                  "type": "string"
              },
              "site_name": {
                  "type": "string"
              },
              "profile": {
                  "$ref": "#/definitions/OpenGraphProfile"
              },
              "book": {
                  "$ref": "#/definitions/OpenGraphBook"
              },
              "article": {
                  "$ref": "#/definitions/OpenGraphArticle"
              },
              "video": {
                  "$ref": "#/definitions/OpenGraphVideo"
              }
          },
          "additionalProperties": false
      },
      "OpenGraphImages": {
          "type": "object",
          "properties": {
              "url": {
                  "type": "string"
              },
              "width": {
                  "type": "number"
              },
              "height": {
                  "type": "number"
              },
              "alt": {
                  "type": "string"
              }
          },
          "required": [
              "url"
          ],
          "additionalProperties": false
      },
      "OpenGraphVideos": {
          "type": "object",
          "properties": {
              "url": {
                  "type": "string"
              },
              "width": {
                  "type": "number"
              },
              "height": {
                  "type": "number"
              },
              "alt": {
                  "type": "string"
              }
          },
          "required": [
              "url"
          ],
          "additionalProperties": false
      },
      "OpenGraphProfile": {
          "type": "object",
          "properties": {
              "firstName": {
                  "type": "string"
              },
              "lastName": {
                  "type": "string"
              },
              "username": {
                  "type": "string"
              },
              "gender": {
                  "type": "string"
              }
          },
          "additionalProperties": false
      },
      "OpenGraphBook": {
          "type": "object",
          "properties": {
              "authors": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "isbn": {
                  "type": "string"
              },
              "releaseDate": {
                  "type": "string"
              },
              "tags": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              }
          },
          "additionalProperties": false
      },
      "OpenGraphArticle": {
          "type": "object",
          "properties": {
              "publishedTime": {
                  "type": "string"
              },
              "modifiedTime": {
                  "type": "string"
              },
              "expirationTime": {
                  "type": "string"
              },
              "authors": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "section": {
                  "type": "string"
              },
              "tags": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              }
          },
          "additionalProperties": false
      },
      "OpenGraphVideo": {
          "type": "object",
          "properties": {
              "actors": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/OpenGraphVideoActors"
                  }
              },
              "directors": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "writers": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "duration": {
                  "type": "number"
              },
              "releaseDate": {
                  "type": "string"
              },
              "tags": {
                  "type": "array",
                  "items": {
                      "type": "string"
                  }
              },
              "series": {
                  "type": "string"
              }
          },
          "additionalProperties": false
      },
      "OpenGraphVideoActors": {
          "type": "object",
          "properties": {
              "profile": {
                  "type": "string"
              },
              "role": {
                  "type": "string"
              }
          },
          "required": [
              "profile"
          ],
          "additionalProperties": false
      },
      "Twitter": {
          "type": "object",
          "properties": {
              "handle": {
                  "type": "string"
              },
              "site": {
                  "type": "string"
              },
              "cardType": {
                  "type": "string"
              }
          },
          "additionalProperties": false
      },
      "MetaTag": {
          "anyOf": [
              {
                  "$ref": "#/definitions/HTML5MetaTag"
              },
              {
                  "$ref": "#/definitions/RDFaMetaTag"
              }
          ]
      },
      "HTML5MetaTag": {
          "type": "object",
          "properties": {
              "content": {
                  "type": "string"
              },
              "name": {
                  "type": "string"
              },
              "property": {
                  "not": {}
              }
          },
          "required": [
              "content",
              "name"
          ],
          "additionalProperties": false
      },
      "RDFaMetaTag": {
          "type": "object",
          "properties": {
              "content": {
                  "type": "string"
              },
              "property": {
                  "type": "string"
              },
              "name": {
                  "not": {}
              }
          },
          "required": [
              "content",
              "property"
          ],
          "additionalProperties": false
      }
  }
}
