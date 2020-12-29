export const defaultSchema = {
  type: 'object',
  properties: {
    AllSeoProps: {
      type: 'string',
      description: '',
    },
    ArticleJsonLdProps: {
      description: 'The component props for a JSON LD Article.',
      type: 'object',
      properties: {
        authorName: {
          type: 'string',
          description: 'The name of the author.',
          value: { type: 'string' },
        },
        authorType: {
          type: 'number',
          enum: ['Person', 'Organization'],
          description: 'The name of the author.',
          value: { type: 'string' },
        },
        body: {
          type: 'string',
          description: 'The actual body of the article.',
        },
        dateCreated: {
          type: 'string',
          description:
            'The date on which the CreativeWork was created or the item was added to a DataFeed.',
          value: { type: 'string' },
        },
        dateModified: {
          type: 'string',
          description:
            'The date and time the article was most recently modified, in ISO 8601 format.',
          value: { type: 'string' },
        },
        datePublished: {
          type: 'string',
          description:
            'The date and time the article was first published, in ISO 8601 format.',
          value: { type: 'string' },
        },
        description: {
          type: 'string',
          description: 'A short description of the article.',
          value: { type: 'string' },
        },
        headline: {
          type: 'array',
          description: 'The headline of the article.',
          items: {
            type: 'string',
            value: '',
          },
        },
        images: {
          type: 'array',
          description:
            'The images URLs that is representative of the article or AMP story.',
          items: {
            type: 'string',
            value: '',
          },
        },
        keywords: {
          type: 'array',
          description: 'Keywords or tags used to describe this content.',
          items: {
            type: 'string',
            value: '',
          },
        },
        publisherLogo: {
          type: 'string',
          description: 'The url of the publisher logo.',
          value: { type: 'string' },
        },
        publisherName: {
          type: 'string',
          description: 'The name of the publisher.',
          value: { type: 'string' },
        },
        speakable: {
          type: 'string',
          description: 'Provide.',
          value: { type: 'string' },
        },
        title: {
          type: 'string',
          description: 'Title.',
          value: { type: 'string' },
        },
        url: {
          type: 'string',
          description: 'The canonical URL of the article page.',
          value: { type: 'string' },
        },
      },
    },
    BaseSeoProps: {
      type: 'object',
      properties: {
        canonical: {
          type: 'string',
          description: 'Set the page canonical url.',
        },
        description: {
          type: 'string',
          description: 'Set the page meta description.',
        },
        facebook_appId: {
          type: 'string',
          description:
            'Used for Facebook Insights, you must add a facebook app ID to your page to for it.',
        },
        language: {
          type: 'string',
          description:
            'The language being used for the current page.This adds the lang attribute to the <html /> e.g. tag https://web.dev/html-has-lang/.',
        },
        languageAlternates: {
          type: 'array',
          description: 'Set the language of the alternate urls.',
          items: {
            hrefLang: { type: 'string' },
            href: { type: 'string' },
          },
        },
        linkTags: {
          type: 'array',
          description:
            'Allows you to add a link tag that is not documented here.',
          items: {
            value: { type: 'string' },
          },
        },
        metaTags: {
          type: 'array',
          description:
            'Allows you to add a meta tag that is not documented here.',
          items: {
            value: { type: 'string' },
          },
        },
        mobileAlternate: {
          type: 'object',
          description: 'Mobile configuration object.',
          properties: {
            media: {
              type: 'string',
              description:
                'Set what screen size the mobile website should be served from.',
            },
            href: {
              type: 'string',
              description: 'Set the mobile page alternate url.',
            },
          },
        },
        nofollow: {
          type: 'boolean',
          description: 'Sets whether page should be followed or not.',
        },
        noindex: {
          type: 'boolean',
          description: 'Sets whether page should be indexed or not.',
        },
        openGraph: {
          type: 'object',
          description: 'The open graph configuration object.',
          properties: {
            url: {
              type: 'string',
              description:
                'The canonical URL of your object that will be used as its permanent ID in the graph.',
            },
            type: {
              type: 'string',
              description:
                'The type of your object. Depending on the type you specify, other properties may also be required.',
            },
            title: {
              type: 'string',
              description:
                'The open graph title, this can be different than your meta title.',
            },
            description: {
              type: 'string',
              description:
                'The open graph description, this can be different than your meta description.',
            },
            images: {
              type: 'array',
              description:
                'An array of images (object) to be used by social media platforms, slack etc as a preview. If multiple supplied you can choose one when sharing.',
              items: {
                url: { type: 'string' },
                width: { type: 'number' },
                height: { type: 'number' },
                alt: { type: 'string' },
              },
            },
            videos: {
              type: 'array',
              description: 'An array of videos.',
              items: {
                url: { type: 'string' },
                width: { type: 'number' },
                height: { type: 'number' },
                alt: { type: 'string' },
              },
            },
            defaultImageHeight: {
              type: 'number',
              description: 'The default height for the image used.',
            },
            defaultImageWidth: {
              type: 'number',
              description: 'The default width of the image used.',
            },
            locale: {
              type: 'string',
              description:
                'The locale the open graph tags are marked up in. Of the format language_TERRITORY. defaultValue en_US',
            },
            site_name: {
              type: 'string',
              description:
                'If your object is part of a larger web site, the name which should be displayed for the overall site.',
            },
            profile: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'Persons first name.',
                },
                lastName: {
                  type: 'string',
                  description: 'Persons last name.',
                },
                username: {
                  type: 'string',
                  description: 'Persons username.',
                },
                gender: {
                  type: 'string',
                  description: 'Persons gender.',
                },
              },
            },
            book: {
              type: 'object',
              description: 'The open graph book configuration object.',
              properties: {
                authors: {
                  type: 'array',
                  description: 'The list of author names for the book.',
                  items: {
                    value: { type: 'string' },
                  },
                },
                isbn: {
                  type: 'string',
                  description:
                    'An ISBN is essentially a product identifier used by publishers, booksellers, libraries, internet retailers and other supply chain participants for ordering, listing, sales records and stock control purposes. The ISBN identifies the registrant as well as the specific title, edition and format.',
                },
                releaseDate: {
                  type: 'string',
                  description: 'The books release date.',
                },
                tags: {
                  type: 'array',
                  description: 'Tags used to further describe the book.',
                  items: {
                    tags: { type: 'string' },
                  },
                },
              },
            },
            article: {
              type: 'object',
              description: 'The open graph article configuration object.',
              properties: {
                publishedTime: { type: 'string' },
                modifiedTime: { type: 'string' },
                expirationTime: { type: 'string' },

                authors: {
                  type: 'array',
                  description: 'The list of author names for the book.',
                  items: {
                    value: { type: 'string' },
                  },
                },
                section: { type: 'string' },
                tags: {
                  type: 'array',
                  description: 'Tags used to further describe the book.',
                  items: {
                    tags: { type: 'string' },
                  },
                },
              },
            },
            video: {
              type: 'object',
              description: 'The open graph video configuration object.',
              properties: {
                actors: {
                  type: 'array',
                  items: {
                    profile: { type: 'string' },
                    role: { type: 'string' },
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
                duration: { type: 'number' },
                releaseDate: { type: 'string' },
                tags: {
                  type: 'array',
                  description: 'Tags used to further describe the book.',
                  items: {
                    tags: { type: 'string' },
                  },
                },
                series: { type: 'string' },
              },
            },
          },
        },
        title: {
          type: 'string',
          description: 'Set the meta title of the page',
        },
        titleTemplate: {
          type: 'string',
          description:
            'Allows you to set default title template that will be added to your title.',
        },
        twitter: {
          type: 'string',
          description: 'The twitter configuration object.',
        },
      },
    },
    BlogJsonLdProps: {
      description: 'The Blog JSON LD props.',
      type: 'object',
      properties: {
        authorName: {
          type: 'string',
          description: 'The name of the author.',
          value: { type: 'string' },
        },
        authorType: {
          type: 'number',
          enum: ['Person', 'Organization'],
          description: 'The name of the author.',
          value: { type: 'string' },
        },
        dateModified: {
          type: 'string',
          description:
            'The date and time the article was most recently modified, in ISO 8601 format.',
          value: { type: 'string' },
        },
        datePublished: {
          type: 'string',
          description:
            'The date and time the article was first published, in ISO 8601 format.',
          value: { type: 'string' },
        },
        description: {
          type: 'string',
          description: 'A short description of the article.',
          value: { type: 'string' },
        },
        headline: {
          type: 'array',
          description: 'The headline of the article.',
          items: {
            type: 'string',
            value: '',
          },
        },
        images: {
          type: 'array',
          description:
            'The images URLs that is representative of the article or AMP story.',
          items: {
            type: 'string',
            value: '',
          },
        },
        issn: {
          type: 'array',
          description:
            'The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication.',
          items: {
            type: 'string',
            value: '',
          },
        },
        keywords: {
          type: 'array',
          description: 'Keywords or tags used to describe this content.',
          items: {
            type: 'string',
            value: '',
          },
        },
        // posts	BlogPost[]	A posting that is part of this blog.
        publisherLogo: {
          type: 'string',
          description: 'The url of the publisher logo.',
          value: { type: 'string' },
        },
        publisherName: {
          type: 'string',
          description: 'The name of the publisher.',
          value: { type: 'string' },
        },
        title: {
          type: 'string',
          description: 'Title.',
          value: { type: 'string' },
        },
        url: {
          type: 'string',
          description: 'The canonical URL of the article page.',
          value: { type: 'string' },
        },
      },
    },
    BlogPostJsonLdProps: {
      type: 'object',
      properties: {
        publisherLogo: {
          type: 'string',
          description: 'The url of the publisher logo.',
          value: { type: 'string' },
        },
        publisherName: {
          type: 'string',
          description: 'The name of the publisher.',
          value: { type: 'string' },
        },
      },
    },
    BookJsonLdProps: {
      description: 'The Book JSON LD Component props.',
      type: 'object',
      properties: {
        authors: {
          type: 'array',
          description:
            'The author(s) of the book. For each author you list, you must provide a specific Person entity. See Person.',
          items: {
            value: { type: 'string' },
          },
        },
        id: {
          type: 'string',
          description:
            'Globally unique ID of the work in the a URL format. The ID should be stable and not change over time. The URL is treated as an opaque string and does not have to resolve to an actual web page.',
        },
        name: {
          type: 'string',
          description:
            'The title of the book. If you provide multiple editions, use the title of the book edition.',
        },
        sameAs: {
          type: 'string',
          description:
            'A reference page that unambiguously indicates the books identity; for example, the URL of the books Wikipedia page, Freebase page, or official website.',
        },
        url: {
          type: 'string',
          description:
            'URL of the page on your site about the book. The page may list all available editions.',
        },
        workExample: {
          type: 'array',
          description:
            'The editions of this book.See sub- properties for workExample.',
          items: {
            type: 'string',
          },
        },
      },
    },
    BreadcrumbJsonLdProps: {
      type: 'array',
      description: '',
      items: {
        item: {
          type: 'string',
          description: 'The URL to the webpage that represents the breadcrumb.',
        },
        name: {
          type: 'string',
          description: 'The title of the breadcrumb displayed for the user.',
        },
        position: {
          type: 'number',
          description:
            'The position of the breadcrumb in the breadcrumb trail.Position 1 signifies the beginning of the trail.',
        },
      },
    },
    ContactPoint: {
      type: 'object',
      description: '',
      properties: {
        areaServed: {
          type: 'array',
          items: {
            value: { type: 'string' },
          },
          availableLanguage: {
            type: 'array',
            items: {
              value: { type: 'string' },
            },
            contactOption: {
              type: 'array',
              items: {
                value: {
                  type: 'string',
                },
              },
              contactType: { type: 'string' },
              telephone: { type: 'string' },
            },
          },
        },
      },
    },
    CorporateContactJsonLdProps: {
      type: 'object',
      description: '',
      properties: {
        contactPoint: {
          type: 'object',
          properties: {
            areaServed: {
              type: 'array',
              items: {
                value: { type: 'string' },
              },
            },
            availableLanguage: {
              type: 'array',
              items: {
                value: { type: 'string' },
              },
            },
            contactOption: {
              type: 'array',
              items: {
                value: { type: 'string' },
              },
            },
            contactType: { type: 'string' },
            telephone: { type: 'string' },
          },
        },
        logo: { type: 'string' },
        url: { type: 'string' },
      },
    },
    CourseJsonLdProps: {
      type: 'object',
      description: 'The Course JSON LD Component props.',
      properties: {
        courseName: { type: 'string' },
        description: {
          type: 'string',
          description:
            'A description of the course. Display limit of 60 characters.',
        },
        name: { type: 'string', description: 'The title of the course.' },
        providerName: {
          type: 'string',
          description: 'The name of the provider.',
        },
        providerUrl: {
          type: 'string',
          description:
            'URL of a reference Web page that unambiguously indicates the items identity. E.g. the URL of the items Wikipedia page, Wikidata entry, or official website.',
        },
      },
    },
    DefaultSeoProps: {
      type: 'object',
      description: '',
      properties: {
        dangerouslySetAllPagesToNoFollow: {
          type: 'boolean',
          description:
            'It has the prefix of dangerously because it will nofollow all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to nofollow **EVERY** page. You can still override this at a page level if you have a use case to follow a page. This can be done by setting nofollow: false.',
        },
        dangerouslySetAllPagesToNoIndex: {
          type: 'boolean',
          description:
            '	It has the prefix of dangerously because it will noindex all pages.As this is an SEO plugin, that is kinda dangerous action.It is ** not ** bad to use this, just please be sure you want to noindex ** EVERY ** page.You can still override this at a page level if you have a use case to index a page.This can be done by setting noindex: false.',
        },
        defaultOpenGraphImageHeight: {
          type: 'number',
          description: '	The default open graph image height.',
        },
        defaultOpenGraphImageWidth: {
          type: 'number',
          description: '	The default open graph image width.',
        },
        defaultOpenGraphVideoHeight: {
          type: 'number',
          description: 'The default open graph video height.',
        },
        defaultOpenGraphVideoWidth: {
          type: 'number',
          description: 'The default open graph video width.',
        },
      },
    },
    DeferSeoProps: {
      type: 'object',
      description: '',
      properties: {
        defer: {
          type: 'boolean',
          description: 'Whether or not to defer the addition of the head tag.',
        },
      },
    },
    FAQJsonLdProps: {
      type: 'object',
      description: 'The FAQPage JSON LD Component props.',
      properties: {
        question: {
          type: 'array',
          description:
            'An array of Question elements which comprise the list of answered questions that this FAQPage is about.',
          items: {
            answer: {
              type: 'string',
              description:
                'The answer to the question. There must be one answer per question.',
            },
            question: {
              type: 'string',
              description:
                'The full text of the question. For example, "How long does it take to process a refund?".',
            },
          },
        },
      },
    },
    GatsbySeoPluginOptions: {
      type: 'string',
      description: '',
    },
    GatsbySeoProps: {
      type: 'string',
      description: '',
    },
    ItemListElements: {
      type: 'string',
      description: '',
    },
    JsonLdProps: {
      type: 'string',
      description: '',
    },
    LocalBusinessJsonLdProps: {
      type: 'string',
      description: '',
    },
    LogoJsonLdProps: {
      type: 'string',
      description: 'The Logo JSON LD component properties.',
    },
    NewsArticleJsonLdProps: {
      type: 'string',
      description: '',
    },
    OpenGraph: {
      type: 'string',
      description: '',
    },
    OpenGraphArticle: {
      type: 'string',
      description: '',
    },
    OpenGraphBook: {
      type: 'string',
      description: '',
    },
    OpenGraphImages: {
      type: 'string',
      description: '',
    },
    OpenGraphProfile: {
      type: 'string',
      description: '',
    },
    OpenGraphVideo: {
      type: 'string',
      description: '',
    },
    OpenGraphVideoActors: {
      type: 'string',
      description: '',
    },
    OpenGraphVideos: {
      type: 'string',
      description: '',
    },
    ProductJsonLdProps: {
      type: 'string',
      description: 'Component props for the Product JSON LD.',
    },
    Question: {
      type: 'string',
      description: 'The questions and answers for an FAQ Page.',
    },
    SpeakableJsonLdProps: {
      type: 'string',
      description: 'The Speakable JSON LD Component props.',
    },
    Twitter: {
      type: 'string',
      description: '',
    },
  },
}
