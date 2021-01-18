export const nextSeo = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/NextSeoProps',
  definitions: {
    NextSeoProps: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        titleTemplate: {
          type: 'string',
        },
        noindex: {
          type: 'boolean',
        },
        nofollow: {
          type: 'boolean',
        },
        description: {
          type: 'string',
        },
        canonical: {
          type: 'string',
        },
        mobileAlternate: {
          type: 'object',
          properties: {
            media: {
              type: 'string',
            },
            href: {
              type: 'string',
            },
          },
          //   "required": [
          //       "media",
          //       "href"
          //   ],
          additionalProperties: false,
        },
        languageAlternates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              hrefLang: {
                type: 'string',
              },
              href: {
                type: 'string',
              },
            },
            required: ['hrefLang', 'href'],
            additionalProperties: false,
          },
        },
        openGraph: {
          $ref: '#/definitions/OpenGraph',
        },
        facebook: {
          type: 'object',
          properties: {
            appId: {
              type: 'string',
            },
          },
          //   "required": [
          //       "appId"
          //   ],
          additionalProperties: false,
        },
        twitter: {
          $ref: '#/definitions/Twitter',
        },
        additionalMetaTags: {
          type: 'array',
          items: {
            $ref: '#/definitions/MetaTag',
          },
        },
      },
      additionalProperties: false,
    },
    OpenGraph: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        images: {
          type: 'array',
          items: {
            $ref: '#/definitions/OpenGraphImages',
          },
        },
        videos: {
          type: 'array',
          items: {
            $ref: '#/definitions/OpenGraphVideos',
          },
        },
        defaultImageHeight: {
          type: 'number',
        },
        defaultImageWidth: {
          type: 'number',
        },
        locale: {
          type: 'string',
        },
        site_name: {
          type: 'string',
        },
        profile: {
          $ref: '#/definitions/OpenGraphProfile',
        },
        book: {
          $ref: '#/definitions/OpenGraphBook',
        },
        article: {
          $ref: '#/definitions/OpenGraphArticle',
        },
        video: {
          $ref: '#/definitions/OpenGraphVideo',
        },
      },
      additionalProperties: false,
    },
    OpenGraphImages: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
        alt: {
          type: 'string',
        },
      },
      required: ['url'],
      additionalProperties: false,
    },
    OpenGraphVideos: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
        alt: {
          type: 'string',
        },
      },
      required: ['url'],
      additionalProperties: false,
    },
    OpenGraphProfile: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        gender: {
          type: 'string',
        },
      },
      additionalProperties: false,
    },
    OpenGraphBook: {
      type: 'object',
      properties: {
        authors: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        isbn: {
          type: 'string',
        },
        releaseDate: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      additionalProperties: false,
    },
    OpenGraphArticle: {
      type: 'object',
      properties: {
        publishedTime: {
          type: 'string',
        },
        modifiedTime: {
          type: 'string',
        },
        expirationTime: {
          type: 'string',
        },
        authors: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        section: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      additionalProperties: false,
    },
    OpenGraphVideo: {
      type: 'object',
      properties: {
        actors: {
          type: 'array',
          items: {
            $ref: '#/definitions/OpenGraphVideoActors',
          },
        },
        directors: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        writers: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        duration: {
          type: 'number',
        },
        releaseDate: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        series: {
          type: 'string',
        },
      },
      additionalProperties: false,
    },
    OpenGraphVideoActors: {
      type: 'object',
      properties: {
        profile: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
      required: ['profile'],
      additionalProperties: false,
    },
    Twitter: {
      type: 'object',
      properties: {
        handle: {
          type: 'string',
        },
        site: {
          type: 'string',
        },
        cardType: {
          type: 'string',
        },
      },
      additionalProperties: false,
    },
    MetaTag: {
      anyOf: [
        {
          $ref: '#/definitions/HTML5MetaTag',
        },
        {
          $ref: '#/definitions/RDFaMetaTag',
        },
      ],
    },
    HTML5MetaTag: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        property: {
          type: 'string',
        },
      },
      required: ['content', 'name'],
      additionalProperties: false,
    },
    RDFaMetaTag: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
        },
        property: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: ['content', 'property'],
      additionalProperties: false,
    },
  },
};

export const gatsbyNextSeo = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $ref: '#/definitions/AllProps',
  definitions: {
    AllProps: {
      type: 'object',
      additionalProperties: false,
      properties: {
        AllSeoProps: {
          type: 'object',
          additionalProperties: false,
          properties: {
            DefaultSeoProps: {
              type: 'object',
              properties: {
                dangerouslySetAllPagesToNoIndex: {
                  type: 'boolean',
                  default: false,
                  description:
                    'It has the prefix of dangerously because it will noindex all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to noindex **EVERY** page. You can still override this at a page level if you have a use case to index a page. This can be done by setting noindex: false.',
                },
                dangerouslySetAllPagesToNoFollow: {
                  type: 'boolean',
                  default: false,
                  description:
                    'It has the prefix of dangerously because it will nofollow all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to nofollow **EVERY** page. You can still override this at a page level if you have a use case to follow a page. This can be done by setting nofollow: false.',
                },
                defaultOpenGraphImageWidth: {
                  type: 'number',
                  default: 0,
                },
                defaultOpenGraphImageHeight: {
                  type: 'number',
                  default: false,
                  description: 'The default open graph image height.',
                },
                defaultOpenGraphVideoWidth: {
                  type: 'number',
                  default: false,
                  description: 'The default open graph video height.',
                },
                defaultOpenGraphVideoHeight: {
                  type: 'number',
                  default: false,
                  description: 'The default open graph video width.',
                },
              },
            },
            GatsbySeoProps: {
              type: 'object',
              properties: {
                BaseSeoProps: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      default: '',
                      description: 'Set the meta title of the page',
                    },
                    titleTemplate: {
                      type: 'string',
                      default: '',
                      description:
                        'Allows you to set default title template that will be added to your title.',
                    },
                    description: {
                      type: 'string',
                      default: '',
                      description: 'Set the page meta description.',
                    },
                    canonical: {
                      type: 'string',
                      default: '',
                      description: 'Set the page canonical url.',
                    },
                    facebook: {
                      type: 'object',
                      description:
                        'Used for Facebook Insights, you must add a facebook app ID to your page to for it.',
                      properties: {
                        appId: {
                          type: 'string',
                          default: '',
                          description:
                            'Used for Facebook Insights, you must add a facebook app ID to your page to for it.',
                        },
                      },
                      required: ['appId'],
                      additionalProperties: false,
                    },
                    twitter: {
                      type: 'object',
                      description: 'The twitter configuration object.',
                      properties: {
                        handle: {
                          type: 'string',
                          default: '',
                          description:
                            '`@username` for the content creator / author (outputs as `twitter:creator`).',
                        },
                        site: {
                          type: 'string',
                          default: '',
                          description:
                            ' `@username` for the website used in the card footer.',
                        },
                        cardType: {
                          type: 'string',
                          default: 'summary',
                          enum: [
                            'summary',
                            'summary_large_image',
                            'app',
                            'player',
                          ],
                          description:
                            'The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`.',
                        },
                      },
                      additionalProperties: false,
                    },
                    language: {
                      type: 'string',
                      default: '',
                      description:
                        'The language being used for the current page.This adds the lang attribute to the <html /> e.g. tag https:/web.dev/html-has-lang/.',
                    },
                    languageAlternates: {
                      type: 'array',
                      description: 'Set the language of the alternate urls.',
                      items: {
                        type: 'object',
                        properties: {
                          hrefLang: {
                            type: 'string',
                            default: '',
                            description: '',
                          },
                          href: {
                            type: 'string',
                            default: '',
                            description: '',
                          },
                        },
                        required: ['hrefLang', 'href'],
                        additionalProperties: false,
                      },
                    },
                    metaTags: {
                      type: 'array',
                      description:
                        'Allows you to add a meta tags.  Invalid if they contain property and name on the same entry.',
                      items: {
                        type: 'object',
                        properties: {
                          content: {
                            type: 'string',
                            default: '',
                            description: '',
                          },
                          name: {
                            type: 'string',
                            default: '',
                            description: '',
                          },
                          property: {
                            type: 'string',
                            default: '',
                            description: '',
                          },
                        },
                        required: ['content', 'name'],
                        additionalProperties: false,
                      },
                    },
                    linkTags: {
                      type: 'object',
                      description:
                        'Allows you to add a link tag that is not documented here.',
                      properties: {
                        link: {
                          type: 'string',
                          default: '',
                        },
                      },
                    },
                    mobileAlternate: {
                      type: 'object',
                      description:
                        'Mobile configuration object. This link relation is used to indicate a relation between a desktop and a mobile website to search engines.',
                      properties: {
                        media: {
                          type: 'string',
                          default: '',
                          description: '',
                        },
                        href: {
                          type: 'string',
                          default: '',
                          description: '',
                        },
                      },
                      required: ['media', 'href'],
                      additionalProperties: false,
                    },
                    noindex: {
                      type: 'boolean',
                      default: false,
                      description:
                        'Sets whether page should be indexed or not.',
                    },
                    nofollow: {
                      type: 'boolean',
                      default: false,
                      description:
                        'Sets whether page should be followed or not.',
                    },
                    openGraph: {
                      type: 'object',
                      description: 'The open graph configuration object.',
                      properties: {
                        url: {
                          type: 'string',
                          default: '',
                          description:
                            'The canonical URL of your object that will be used as its permanent ID in the graph.',
                        },
                        type: {
                          type: 'string',
                          default: '',
                          description:
                            'The type of your object. Depending on the type you specify, other properties may also be required.',
                        },
                        title: {
                          type: 'string',
                          default: '',
                          description:
                            'The open graph title, this can be different than your meta title.',
                        },
                        description: {
                          type: 'string',
                          default: '',
                          description:
                            'The open graph description, this can be different than your meta description',
                        },
                        images: {
                          type: 'array',
                          description:
                            'An array of images (object) to be used by social media platforms, slack etc',
                          items: {
                            type: 'object',
                            properties: {
                              url: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                              width: {
                                type: 'number',
                                default: 0,
                                description: '',
                              },
                              height: {
                                type: 'number',
                                default: 0,
                                description: '',
                              },
                              alt: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            required: ['url'],
                            additionalProperties: false,
                          },
                        },
                        videos: {
                          type: 'array',
                          description: 'An array of videos.',
                          items: {
                            type: 'object',
                            properties: {
                              url: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                              width: {
                                type: 'number',
                                default: 0,
                                description: '',
                              },
                              height: {
                                type: 'number',
                                default: 0,
                                description: '',
                              },
                              alt: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            required: ['url'],
                            additionalProperties: false,
                          },
                        },
                        defaultImageHeight: {
                          type: 'number',
                          default: 0,
                          description: 'The default height for the image used.',
                        },
                        defaultImageWidth: {
                          type: 'number',
                          default: 0,
                          description: 'The default width of the image used.',
                        },
                        locale: {
                          type: 'string',
                          default: 'en_US',
                          description:
                            'The locale the open graph tags are marked up in. Of the format language_TERRITORY.',
                        },
                        site_name: {
                          type: 'string',
                          default: '',
                          description:
                            'If your object is part of a larger web site, the name which should be displayed for the overall site.',
                        },
                        profile: {
                          type: 'object',
                          description:
                            'The open graph profile configuration object.',
                          properties: {
                            firstName: {
                              type: 'string',
                              default: '',
                              description: 'Persons first name.',
                            },
                            lastName: {
                              type: 'string',
                              default: '',
                              description: 'Persons last name.',
                            },
                            username: {
                              type: 'string',
                              default: '',
                              description: 'Persons username.',
                            },
                            gender: {
                              type: 'string',
                              default: '',
                              description: 'Persons gender.',
                            },
                          },
                          additionalProperties: false,
                        },
                        book: {
                          type: 'object',
                          description:
                            'The open graph book configuration object.',
                          properties: {
                            authors: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description:
                                  'The list of author names for the book.',
                              },
                            },
                            isbn: {
                              type: 'string',
                              default: '',
                              description:
                                'The International Standard Book Number which identifies the book. An ISBN is essentially a product identifier used by publishers, booksellers, libraries, internet retailers and other supply chain participants for ordering, listing, sales records and stock control purposes. The ISBN identifies the registrant as well as the specific title, edition and format.',
                            },
                            releaseDate: {
                              type: 'string',
                              default: '',
                              description: 'The books release date.',
                            },
                            tags: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description:
                                  'Tags used to further describe the book.',
                              },
                            },
                          },
                          additionalProperties: false,
                        },
                        article: {
                          type: 'object',
                          description:
                            'The open graph article configuration object.',
                          properties: {
                            publishedTime: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                            modifiedTime: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                            expirationTime: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                            authors: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            section: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                            tags: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                          },
                          additionalProperties: false,
                        },
                        video: {
                          type: 'object',
                          description:
                            'The open graph video configuration object.',
                          properties: {
                            actors: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  profile: {
                                    type: 'string',
                                    default: '',
                                    description: '',
                                  },
                                  role: {
                                    type: 'string',
                                    default: '',
                                    description: '',
                                  },
                                },
                                required: ['profile'],
                                additionalProperties: false,
                              },
                            },
                            directors: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            writers: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            duration: {
                              type: 'number',
                              default: 0,
                              description: '',
                            },
                            releaseDate: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                            tags: {
                              type: 'array',
                              items: {
                                type: 'string',
                                default: '',
                                description: '',
                              },
                            },
                            series: {
                              type: 'string',
                              default: '',
                              description: '',
                            },
                          },
                          additionalProperties: false,
                        },
                      },
                      additionalProperties: false,
                    },
                  },
                },
                DeferSeoProps: {
                  type: 'object',
                  description:
                    'Whether or not to defer the addition of the head tag.',
                  properties: {
                    defer: {
                      type: 'boolean',
                      default: false,
                    },
                  },
                },
              },
            },
          },
        },
        ArticleJsonLdProps: {
          type: 'object',
          additionalProperties: false,
          properties: {
            authorName: {
              type: 'string',
              default: '',
              description: 'The name of the author.',
            },
            authorType: {
              type: 'string',
              default: '',
              description: 'The type of author for this article.',
              enum: ['Person', 'Organization'],
            },
            url: {
              type: 'string',
              default: '',
              description: 'The canonical URL of the article page.',
            },
            title: {
              type: 'string',
              default: '',
              description: 'The title of the book.',
            },
            body: {
              type: 'string',
              default: '',
              description: 'The actual body of the article.',
            },
            dateCreated: {
              type: 'string',
              default: '',
              description:
                'The date on which the CreativeWork was created or the item was added to a DataFeed.',
            },
            dateModified: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was most recently modified, in ISO 8601 format.',
            },
            datePublished: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was first published, in ISO 8601 format.',
            },
            description: {
              type: 'string',
              default: '',
              description: 'A short description of the article.',
            },
            publisherLogo: {
              type: 'string',
              default: '',
              description: 'The url of the publisher logo.',
            },
            publisherName: {
              type: 'string',
              default: '',
              description: 'The name of the publisher.',
            },
            headline: {
              type: 'array',
              description:
                'The headline of the article. Headlines should not exceed 110 characters. For AMP stories, the headline should match the text in the first cover page in the AMP Story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            images: {
              type: 'array',
              description:
                'The images URLs that is representative of the article or AMP story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            keywords: {
              type: 'array',
              description: 'Keywords or tags used to describe this content.',
              items: {
                type: 'string',
                default: '',
              },
            },
          },
        },
        BlogJsonLdProps: {
          type: 'object',
          description: 'The Blog JSON LD props.',
          properties: {
            authorName: {
              type: 'string',
              default: '',
              description: 'The name of the author.',
            },
            authorType: {
              type: 'string',
              default: '',
              description: 'The type of author for this article.',
              enum: ['Person', 'Organization'],
            },
            url: {
              type: 'string',
              default: '',
              description: 'The canonical URL of the article page.',
            },
            title: {
              type: 'string',
              default: '',
              description: 'The title of the book.',
            },
            dateModified: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was most recently modified, in ISO 8601 format.',
            },
            datePublished: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was first published, in ISO 8601 format.',
            },
            description: {
              type: 'string',
              default: '',
              description: 'A short description of the article.',
            },
            publisherLogo: {
              type: 'string',
              default: '',
              description: 'The url of the publisher logo.',
            },
            publisherName: {
              type: 'string',
              default: '',
              description: 'The name of the publisher.',
            },
            headline: {
              type: 'array',
              description:
                'The headline of the article. Headlines should not exceed 110 characters. For AMP stories, the headline should match the text in the first cover page in the AMP Story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            images: {
              type: 'array',
              description:
                'The images URLs that is representative of the article or AMP story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            keywords: {
              type: 'array',
              description: 'Keywords or tags used to describe this content.',
              items: {
                type: 'string',
                default: '',
              },
            },
            posts: {
              type: 'array',
              description: 'A posting that is part of this blog.',
              items: {
                type: 'object',
                description: '',
                properties: {
                  headline: {
                    type: 'string',
                    description: 'Headline of the blog post.',
                    default: '',
                  },
                },
              },
            },
            issn: {
              type: 'array',
              description:
                'The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication.',
              items: {
                type: 'string',
                default: '',
              },
            },
          },
        },
        BlogPostJsonLdProps: {
          type: 'object',
          additionalProperties: false,
          properties: {
            authorName: {
              type: 'string',
              default: '',
              description: 'The name of the author.',
            },
            authorType: {
              type: 'string',
              default: '',
              description: 'The type of author for this article.',
              enum: ['Person', 'Organization'],
            },
            url: {
              type: 'string',
              default: '',
              description: 'The canonical URL of the article page.',
            },
            title: {
              type: 'string',
              default: '',
              description: 'The title of the book.',
            },
            body: {
              type: 'string',
              default: '',
              description: 'The actual body of the article.',
            },
            dateCreated: {
              type: 'string',
              default: '',
              description:
                'The date on which the CreativeWork was created or the item was added to a DataFeed.',
            },
            dateModified: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was most recently modified, in ISO 8601 format.',
            },
            datePublished: {
              type: 'string',
              default: '',
              description:
                'The date and time the article was first published, in ISO 8601 format.',
            },
            description: {
              type: 'string',
              default: '',
              description: 'A short description of the article.',
            },
            publisherLogo: {
              type: 'string',
              default: '',
              description: 'The url of the publisher logo.',
            },
            publisherName: {
              type: 'string',
              default: '',
              description: 'The name of the publisher.',
            },
            headline: {
              type: 'array',
              description:
                'The headline of the article. Headlines should not exceed 110 characters. For AMP stories, the headline should match the text in the first cover page in the AMP Story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            images: {
              type: 'array',
              description:
                'The images URLs that is representative of the article or AMP story.',
              items: {
                type: 'string',
                default: '',
              },
            },
            keywords: {
              type: 'array',
              description: 'Keywords or tags used to describe this content.',
              items: {
                type: 'string',
                default: '',
              },
            },
          },
        },
        BookJsonLdProps: {
          type: 'object',
          description: 'The Book JSON LD Component props.',
          properties: {
            author: {
              description:
                'The author(s) of the book. For each author you list, you must provide a specific Person entity. See Person.',
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  default: '',
                  description: 'The name of the person.',
                },
                sameAs: {
                  type: 'string',
                  default: '',
                  description:
                    'A reference page that unambiguously indicates the items identity; for example, the URL of the items Wikipedia page, Freebase page, or official website.',
                },
              },
            },
            id: {
              type: 'string',
              default: '',
              description:
                'Globally unique ID of the work in the a URL format. The ID should be stable and not change over time. The URL is treated as an opaque string and does not have to resolve to an actual web page.',
            },
            name: {
              type: 'string',
              description:
                'The title of the book. If you provide multiple editions, use the title of the book edition.',
              default: '',
            },
            sameAs: {
              type: 'string',
              default: '',
              description:
                'A reference page that unambiguously indicates the books identity; for example, the URL of the books Wikipedia page, Freebase page, or official website.',
            },
            url: {
              type: 'string',
              description:
                'URL of the page on your site about the book. The page may list all available editions.',
              default: '',
            },
            workExample: {
              type: 'array',
              description: 'The editions of this book.',
              items: {
                type: 'object',
                properties: {
                  bookFormat: {
                    description:
                      'The format of the book using one or more of the `BookFormatType`s:',
                    type: 'string',
                    enum: [
                      'AudiobookFormat',
                      'EBook',
                      'GraphicNovel',
                      'Hardcover',
                      'Paperback',
                    ],
                  },
                },
                isbn: {
                  type: 'string',
                  description:
                    'The ISBN of the tome. The ISBN can be either 10 or 13 digits, but we recommend 13 digits if available. Use the ISBN of the print book instead if there is no ISBN for the edition being described; for example, for the Kindle edition.',
                  default: '',
                },
                potentialAction: {
                  type: 'string',
                  description: 'NOT DEFINED! Read action(s) for the book.',
                  default: '',
                },
                '@id': {
                  type: 'string',
                  description:
                    'Globally unique ID of the volume in the form of a URL. The ID should be stable and not change over time. It should also be distinct from the ID used for the book. The URL is treated as an opaque string and does not have to be a working link.',
                  default: '',
                },
                author: {
                  type: 'array',
                  description:
                    'The author(s) of the tome. Only use this property if the author(s) of the tome differ from the related book. Provide one Person entity per author.',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        default: '',
                        description: 'The name of the person.',
                      },
                      sameAs: {
                        type: 'string',
                        default: '',
                        description:
                          'A reference page that unambiguously indicates the items identity; for example, the URL of the items Wikipedia page, Freebase page, or official website.',
                      },
                    },
                  },
                },
                bookEdition: {
                  type: 'string',
                  default: '',
                  description: 'The edition of the book.',
                },
                datePublished: {
                  type: 'string',
                  description: 'Date of first publication of this tome.',
                  default: '',
                  format: 'date',
                },
                name: {
                  type: 'string',
                  default: '',
                  description:
                    'The title of the tome. Only use this property for the title of the tome if it differs from the book.',
                },
                sameAs: {
                  type: 'string',
                  default: '',
                  description:
                    'A reference page that unambiguously indicates the books identity; for example, the URL of the books Wikipedia page, Freebase page, or official website.',
                },
                url: {
                  type: 'string',
                  default: '',
                  description: 'URL specific to this edition if one exists.',
                },
              },
            },
          },
        },
        BreadcrumbJsonLdProps: {
          type: 'array',
          description:
            'An array of breadcrumbs listed in a specific order. Specify each breadcrumb with a ListItem',
          items: {
            type: 'object',
            properties: {
              item: {
                type: 'string',
                description:
                  'The URL to the webpage that represents the breadcrumb.',
                default: '',
              },
              name: {
                type: 'string',
                description:
                  'The title of the breadcrumb displayed for the user.',
                default: '',
              },
              position: {
                type: 'string',
                description:
                  'The position of the breadcrumb in the breadcrumb trail. Position 1 signifies the beginning of the trail.',
                default: '',
              },
            },
          },
        },
        CourseJsonLdProps: {
          type: 'object',
          description: 'The Course JSON LD Component props.',
          properties: {
            courseName: {
              type: 'string',
              description: 'The course name',
              default: '',
            },
            description: {
              type: 'string',
              description:
                'A description of the course. Display limit of 60 characters.',
              default: '',
            },
            name: {
              type: 'string',
              description: 'The title of the course.',
              default: '',
            },
            providerName: {
              type: 'string',
              description: 'The name of the provider.',
              default: '',
            },
            providerUrl: {
              type: 'string',
              description:
                'URL of a reference Web page that unambiguously indicates the items identity. E.g. the URL of the items Wikipedia page,Wikidata entry, or official website.',
              default: '',
            },
          },
        },
        FAQJsonLdProps: {
          type: 'object',
          description: 'The Course JSON LD Component props.',
          properties: {
            questions: {
              type: 'array',
              description:
                'An array of Question elements which comprise the list of answered questions that this FAQPage is about.',
              items: {
                type: 'object',
                description: 'The questions and answers for an FAQ Page.',
                properties: {
                  answer: {
                    type: 'string',
                    default: '',
                    description:
                      'The answer to the question. There must be one answer per question.',
                  },
                  question: {
                    type: 'string',
                    default: '',
                    description:
                      'The full text of the question. For example, "How long does it take to process a refund?".',
                  },
                },
              },
            },
          },
        },
        LogoJsonLdProps: {
          description: 'The Logo JSON LD component properties.',
          type: 'object',
          properties: {
            logo: {
              type: 'string',
              default: '',
              description:
                'URL of a logo that is representative of the organization.',
            },
            url: {
              type: 'string',
              default: '',
              description: 'The URL of the website associated with the logo.',
            },
          },
        },
        ProductJsonLdProps: {
          description: 'Component props for the Product JSON LD.',
          type: 'object',
          properties: {
            aggregateRating: {
              type: 'object',
              description: 'A nested aggregateRating of the product.',
              properties: {
                bestRating: {
                  type: 'string',
                  default: '',
                  description:
                    'The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed.',
                },
                ratingExplanation: {
                  type: 'string',
                  default: '',
                  description:
                    'A short explanation (e.g. one to two sentences) providing background context and other information that led to the conclusion expressed in the rating. This is particularly applicable to ratings associated with "fact check" markup using {@link http://schema.org/ClaimReview ClaimReview}.',
                },
                ratingValue: {
                  type: 'string',
                  default: '',
                  description:
                    'Use values from 0123456789 (Unicode `DIGIT ZERO` (U+0030) to `DIGIT NINE` (U+0039)) rather than superficially similiar Unicode symbols. Use `.` (Unicode `FULL STO` (U+002E)) rather than `,` to indicate a decimal point. Avoid using these symbols as a readability separator.',
                },
                reviewAspect: {
                  type: 'string',
                  default: '',
                  description:
                    'This Review or Rating is relevant to this part or facet of the itemReviewed.',
                },
                worstRating: {
                  type: 'string',
                  default: '',
                  description:
                    'The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed.',
                },
                ratingCount: {
                  type: 'number',
                  default: '',
                  description: 'The count of total number of ratings.',
                },
                reviewCount: {
                  type: 'number',
                  default: '',
                  description: 'The count of total number of reviews.',
                },
              },
            },
            brand: {
              type: 'string',
              default: '',
              description: '	The brand of the product.',
            },
            description: {
              type: 'string',
              default: '',
              description: 'Product description.',
            },
            gtin: {
              type: 'array',
              description: 'A Global Trade Item Number (GTIN).',
              items: {
                type: 'string',
                default: '',
              },
            },
            gtin12: {
              type: 'array',
              description:
                'The GTIN-12 code of the product, or the product to which the offer refers.',
              items: {
                type: 'string',
                default: '',
              },
              gtin13: {
                type: 'array',
                description:
                  'The GTIN-13 code of the product, or the product to which the offer refers.',
                items: {
                  type: 'string',
                  default: '',
                },
              },
              gtin14: {
                type: 'array',
                description:
                  'The GTIN-14 code of the product, or the product to which the offer refers.',
                items: {
                  type: 'string',
                  default: '',
                },
              },
              gtin8: {
                type: 'array',
                description:
                  'The GTIN-8 code of the product, or the product to which the offer refers.',
                items: {
                  type: 'string',
                  default: '',
                },
              },
              images: {
                type: 'array',
                description:
                  'The URL(s) of a product photo. Pictures clearly showing the product (for example, against a white background) are preferred.',
                items: {
                  type: 'string',
                  default: '',
                },
              },
              mpn: {
                type: 'array',
                description:
                  'The Manufacturer Part Number (MPN) of the product, or the product to which the offer refers.',
                items: {
                  type: 'string',
                  default: '',
                },
              },
              name: {
                type: 'string',
                default: '',
                description: 'The name of the product.',
              },
              offers: {
                type: 'object',
                description:
                  'An offer to sell the product. Includes a nested Offer or AggregateOffer.',
                properties: {
                  price: {
                    type: 'string',
                    default: '',
                    description: 'The price of the product.',
                  },
                  priceCurrency: {
                    type: 'string',
                    default: '',
                    description:
                      'The currency used to describe the product price, in three-letter ISO 4217 format',
                  },
                  priceValidUntil: {
                    type: 'string',
                    default: '',
                    description:
                      'The date (in ISO 8601 date format) after which the price will no longer be available. Your product snippet may not display if the priceValidUtil property indicates a past date.',
                  },
                  itemCondition: {
                    type: 'string',
                    default: '',
                    description: 'The item condition.',
                    enum: [
                      'DamagedCondition',
                      'NewCondition',
                      'RefurbishedCondition',
                      'UsedCondition',
                    ],
                  },
                  availability: {
                    type: 'string',
                    default: '',
                    description:
                      'Google also understands their short names (for example InStock or OutOfStock, without the full URL scope.) This property is required for the Related Items feature in Google Images and is recommended for Google Search.',
                    enum: [
                      'Discontinued',
                      'InStock',
                      'InStoreOnly',
                      'LimitedAvailability',
                      'OnlineOnly',
                      'OutOfStock',
                      'PreOrder',
                      'PreSale',
                      'SoldOut',
                    ],
                  },
                },
                url: {
                  type: 'string',
                  default: '',
                  description:
                    'A URL to the product web page (that includes the Offer).',
                },
              },
            },
          },
        },
      },
    },
    type: 'object',
    properties: {
      AllSeoProps: {
        $ref: '#/definitions/AllProps',
      },
    },
  },
};
