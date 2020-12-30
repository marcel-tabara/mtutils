export const seoNext = {
  definitions: {
    AllSeoProps: {
      properties: {
        canonical: {
          description: 'Set the page canonical url.',
          type: 'string',
        },
        dangerouslySetAllPagesToNoFollow: {
          description:
            'It has the prefix of `dangerously` because it will `nofollow` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `nofollow` **EVERY** page. You\ncan still override this at a page level if you have a use case to `follow`\na page. This can be done by setting `nofollow: false`.',
          type: 'boolean',
        },
        dangerouslySetAllPagesToNoIndex: {
          description:
            'It has the prefix of `dangerously` because it will `noindex` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `noindex` **EVERY** page. You can\nstill override this at a page level if you have a use case to `index` a\npage. This can be done by setting `noindex: false`.',
          type: 'boolean',
        },
        defaultOpenGraphImageHeight: {
          description: 'The default open graph image height.',
          type: 'number',
        },
        defaultOpenGraphImageWidth: {
          description: 'The default open graph image width.',
          type: 'number',
        },
        defaultOpenGraphVideoHeight: {
          description: 'The default open graph video height.',
          type: 'number',
        },
        defaultOpenGraphVideoWidth: {
          description: 'The default open graph video width.',
          type: 'number',
        },
        defer: {
          description: 'Whether or not to defer the addition of the head tag.',
          type: 'boolean',
        },
        description: {
          description: 'Set the page meta description.',
          type: 'string',
        },
        facebook: {
          description:
            'Used for Facebook Insights, you must add a facebook app ID to your page to\nfor it.',
          properties: {
            appId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        language: {
          description:
            'The language being used for the current page.\n\nThis adds the `lang` attribute to the  `<html />` e.g. tag https://web.dev/html-has-lang/.',
          type: 'string',
        },
        languageAlternates: {
          description: 'Set the language of the alternate urls.',
          items: {
            $ref: '#/definitions/LanguageAlternate',
          },
          type: 'array',
        },
        linkTags: {
          description:
            'Allows you to add a link tag that is not documented here.',
        },
        metaTags: {
          description:
            'Allows you to add a meta tag that is not documented here.',
        },
        mobileAlternate: {
          $ref: '#/definitions/MobileAlternate',
          description: 'Mobile configuration object.',
        },
        nofollow: {
          description: 'Sets whether page should be followed or not.',
          type: 'boolean',
        },
        noindex: {
          description: 'Sets whether page should be indexed or not.',
          type: 'boolean',
        },
        openGraph: {
          $ref: '#/definitions/OpenGraph',
          description: 'The open graph configuration object.',
        },
        title: {
          description: 'Set the meta title of the page',
          type: 'string',
        },
        titleTemplate: {
          description:
            'Allows you to set default title template that will be added to your title.',
          type: 'string',
        },
        twitter: {
          $ref: '#/definitions/Twitter',
          description: 'The twitter configuration object.',
        },
      },
      type: 'object',
    },
    BaseSeoProps: {
      properties: {
        canonical: {
          description: 'Set the page canonical url.',
          type: 'string',
        },
        description: {
          description: 'Set the page meta description.',
          type: 'string',
        },
        facebook: {
          description:
            'Used for Facebook Insights, you must add a facebook app ID to your page to\nfor it.',
          properties: {
            appId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        language: {
          description:
            'The language being used for the current page.\n\nThis adds the `lang` attribute to the  `<html />` e.g. tag https://web.dev/html-has-lang/.',
          type: 'string',
        },
        languageAlternates: {
          description: 'Set the language of the alternate urls.',
          items: {
            $ref: '#/definitions/LanguageAlternate',
          },
          type: 'array',
        },
        linkTags: {
          type: 'string',
          description:
            'Allows you to add a link tag that is not documented here.',
        },
        metaTags: {
          type: 'string',
          description:
            'Allows you to add a meta tag that is not documented here.',
        },
        mobileAlternate: {
          $ref: '#/definitions/MobileAlternate',
          description: 'Mobile configuration object.',
        },
        nofollow: {
          description: 'Sets whether page should be followed or not.',
          type: 'boolean',
        },
        noindex: {
          description: 'Sets whether page should be indexed or not.',
          type: 'boolean',
        },
        openGraph: {
          $ref: '#/definitions/OpenGraph',
          description: 'The open graph configuration object.',
        },
        title: {
          description: 'Set the meta title of the page',
          type: 'string',
        },
        titleTemplate: {
          description:
            'Allows you to set default title template that will be added to your title.',
          type: 'string',
        },
        twitter: {
          $ref: '#/definitions/Twitter',
          description: 'The twitter configuration object.',
        },
      },
      type: 'object',
    },
    DefaultSeoProps: {
      properties: {
        dangerouslySetAllPagesToNoFollow: {
          description:
            'It has the prefix of `dangerously` because it will `nofollow` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `nofollow` **EVERY** page. You\ncan still override this at a page level if you have a use case to `follow`\na page. This can be done by setting `nofollow: false`.',
          type: 'boolean',
        },
        dangerouslySetAllPagesToNoIndex: {
          description:
            'It has the prefix of `dangerously` because it will `noindex` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `noindex` **EVERY** page. You can\nstill override this at a page level if you have a use case to `index` a\npage. This can be done by setting `noindex: false`.',
          type: 'boolean',
        },
        defaultOpenGraphImageHeight: {
          description: 'The default open graph image height.',
          type: 'number',
        },
        defaultOpenGraphImageWidth: {
          description: 'The default open graph image width.',
          type: 'number',
        },
        defaultOpenGraphVideoHeight: {
          description: 'The default open graph video height.',
          type: 'number',
        },
        defaultOpenGraphVideoWidth: {
          description: 'The default open graph video width.',
          type: 'number',
        },
      },
      type: 'object',
    },
    DeferSeoProps: {
      properties: {
        defer: {
          description: 'Whether or not to defer the addition of the head tag.',
          type: 'boolean',
        },
      },
      type: 'object',
    },
    GatsbySeoPluginOptions: {
      properties: {
        canonical: {
          description: 'Set the page canonical url.',
          type: 'string',
        },
        dangerouslySetAllPagesToNoFollow: {
          description:
            'It has the prefix of `dangerously` because it will `nofollow` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `nofollow` **EVERY** page. You\ncan still override this at a page level if you have a use case to `follow`\na page. This can be done by setting `nofollow: false`.',
          type: 'boolean',
        },
        dangerouslySetAllPagesToNoIndex: {
          description:
            'It has the prefix of `dangerously` because it will `noindex` all pages. As\nthis is an SEO plugin, that is kinda dangerous action. It is **not** bad to\nuse this, just please be sure you want to `noindex` **EVERY** page. You can\nstill override this at a page level if you have a use case to `index` a\npage. This can be done by setting `noindex: false`.',
          type: 'boolean',
        },
        defaultOpenGraphImageHeight: {
          description: 'The default open graph image height.',
          type: 'number',
        },
        defaultOpenGraphImageWidth: {
          description: 'The default open graph image width.',
          type: 'number',
        },
        defaultOpenGraphVideoHeight: {
          description: 'The default open graph video height.',
          type: 'number',
        },
        defaultOpenGraphVideoWidth: {
          description: 'The default open graph video width.',
          type: 'number',
        },
        description: {
          description: 'Set the page meta description.',
          type: 'string',
        },
        facebook: {
          description:
            'Used for Facebook Insights, you must add a facebook app ID to your page to\nfor it.',
          properties: {
            appId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        language: {
          description:
            'The language being used for the current page.\n\nThis adds the `lang` attribute to the  `<html />` e.g. tag https://web.dev/html-has-lang/.',
          type: 'string',
        },
        languageAlternates: {
          description: 'Set the language of the alternate urls.',
          items: {
            $ref: '#/definitions/LanguageAlternate',
          },
          type: 'array',
        },
        linkTags: {
          description:
            'Allows you to add a link tag that is not documented here.',
        },
        metaTags: {
          description:
            'Allows you to add a meta tag that is not documented here.',
        },
        mobileAlternate: {
          $ref: '#/definitions/MobileAlternate',
          description: 'Mobile configuration object.',
        },
        nofollow: {
          description: 'Sets whether page should be followed or not.',
          type: 'boolean',
        },
        noindex: {
          description: 'Sets whether page should be indexed or not.',
          type: 'boolean',
        },
        openGraph: {
          $ref: '#/definitions/OpenGraph',
          description: 'The open graph configuration object.',
        },
        title: {
          description: 'Set the meta title of the page',
          type: 'string',
        },
        titleTemplate: {
          description:
            'Allows you to set default title template that will be added to your title.',
          type: 'string',
        },
        twitter: {
          $ref: '#/definitions/Twitter',
          description: 'The twitter configuration object.',
        },
      },
      type: 'object',
    },
    GatsbySeoProps: {
      properties: {
        canonical: {
          description: 'Set the page canonical url.',
          type: 'string',
        },
        defer: {
          description: 'Whether or not to defer the addition of the head tag.',
          type: 'boolean',
        },
        description: {
          description: 'Set the page meta description.',
          type: 'string',
        },
        facebook: {
          description:
            'Used for Facebook Insights, you must add a facebook app ID to your page to\nfor it.',
          properties: {
            appId: {
              type: 'string',
            },
          },
          type: 'object',
        },
        language: {
          description:
            'The language being used for the current page.\n\nThis adds the `lang` attribute to the  `<html />` e.g. tag https://web.dev/html-has-lang/.',
          type: 'string',
        },
        languageAlternates: {
          description: 'Set the language of the alternate urls.',
          items: {
            $ref: '#/definitions/LanguageAlternate',
          },
          type: 'array',
        },
        linkTags: {
          description:
            'Allows you to add a link tag that is not documented here.',
        },
        metaTags: {
          description:
            'Allows you to add a meta tag that is not documented here.',
        },
        mobileAlternate: {
          $ref: '#/definitions/MobileAlternate',
          description: 'Mobile configuration object.',
        },
        nofollow: {
          description: 'Sets whether page should be followed or not.',
          type: 'boolean',
        },
        noindex: {
          description: 'Sets whether page should be indexed or not.',
          type: 'boolean',
        },
        openGraph: {
          $ref: '#/definitions/OpenGraph',
          description: 'The open graph configuration object.',
        },
        title: {
          description: 'Set the meta title of the page',
          type: 'string',
        },
        titleTemplate: {
          description:
            'Allows you to set default title template that will be added to your title.',
          type: 'string',
        },
        twitter: {
          $ref: '#/definitions/Twitter',
          description: 'The twitter configuration object.',
        },
      },
      type: 'object',
    },
    LanguageAlternate: {
      properties: {
        href: {
          type: 'string',
        },
        hrefLang: {
          type: 'string',
        },
      },
      type: 'object',
    },
    MobileAlternate: {
      properties: {
        href: {
          description: 'Set the mobile page alternate url.',
          type: 'string',
        },
        media: {
          description:
            'Set what screen size the mobile website should be served from.',
          type: 'string',
        },
      },
      type: 'object',
    },
    OpenGraph: {
      properties: {
        article: {
          $ref: '#/definitions/OpenGraphArticle',
          description: 'The open graph article configuration object.',
        },
        book: {
          $ref: '#/definitions/OpenGraphBook',
          description: 'The open graph book configuration object.',
        },
        defaultImageHeight: {
          description: 'The default height for the image used.',
          type: 'number',
        },
        defaultImageWidth: {
          description: 'The default width of the image used.',
          type: 'number',
        },
        description: {
          description:
            'The open graph description, this can be different than your meta\ndescription.',
          type: 'string',
        },
        images: {
          description:
            'An array of images (object) to be used by social media platforms, slack etc\nas a preview. If multiple supplied you can choose one when sharing.',
          items: {
            $ref: '#/definitions/OpenGraphImages',
          },
          type: 'array',
        },
        locale: {
          description:
            'The locale the open graph tags are marked up in. Of the format\nlanguage_TERRITORY.',
          type: 'string',
        },
        profile: {
          $ref: '#/definitions/OpenGraphProfile',
          description: 'The open graph profile configuration object.',
        },
        site_name: {
          description:
            'If your object is part of a larger web site, the name which should be\ndisplayed for the overall site.',
          type: 'string',
        },
        title: {
          description:
            'The open graph title, this can be different than your meta title.',
          type: 'string',
        },
        type: {
          description:
            'The type of your object. Depending on the type you specify, other\nproperties may also be required.',
          type: 'string',
        },
        url: {
          description:
            'The canonical URL of your object that will be used as its permanent ID in\nthe graph.',
          type: 'string',
        },
        video: {
          $ref: '#/definitions/OpenGraphVideo',
          description: 'The open graph video configuration object.',
        },
        videos: {
          description: 'An array of videos.',
          items: {
            $ref: '#/definitions/OpenGraphVideos',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    OpenGraphArticle: {
      properties: {
        authors: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        expirationTime: {
          type: 'string',
        },
        modifiedTime: {
          type: 'string',
        },
        publishedTime: {
          type: 'string',
        },
        section: {
          type: 'string',
        },
        tags: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    OpenGraphBook: {
      properties: {
        authors: {
          description: 'The list of author names for the book.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        isbn: {
          description:
            'The International Standard Book Number which identifies the book.',
          type: 'string',
        },
        releaseDate: {
          description: 'The books release date.',
          type: 'string',
        },
        tags: {
          description: 'Tags used to further describe the book.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    OpenGraphImages: {
      properties: {
        alt: {
          type: 'string',
        },
        height: {
          type: 'number',
        },
        url: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
      },
      type: 'object',
    },
    OpenGraphProfile: {
      properties: {
        firstName: {
          description: "Person's first name.",
          type: 'string',
        },
        gender: {
          description: "Person's gender.",
          type: 'string',
        },
        lastName: {
          description: "Person's last name.",
          type: 'string',
        },
        username: {
          description: "Person's username.",
          type: 'string',
        },
      },
      type: 'object',
    },
    OpenGraphVideo: {
      properties: {
        actors: {
          items: {
            $ref: '#/definitions/OpenGraphVideoActors',
          },
          type: 'array',
        },
        directors: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        duration: {
          type: 'number',
        },
        releaseDate: {
          type: 'string',
        },
        series: {
          type: 'string',
        },
        tags: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        writers: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    OpenGraphVideoActors: {
      properties: {
        profile: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
      },
      type: 'object',
    },
    OpenGraphVideos: {
      properties: {
        alt: {
          type: 'string',
        },
        height: {
          type: 'number',
        },
        url: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
      },
      type: 'object',
    },
    OtherElementAttributes: {
      additionalProperties: {
        type: ['string', 'number', 'boolean'],
      },
      type: 'object',
    },
    Twitter: {
      properties: {
        cardType: {
          description:
            'The card type, which will be one of `summary`, `summary_large_image`,\n`app`, or `player`.',
          enum: ['app', 'player', 'summary', 'summary_large_image'],
          type: 'string',
        },
        handle: {
          description:
            '`@username` for the content creator / author (outputs as `twitter:creator`).',
          type: 'string',
        },
        site: {
          description: '`@username` for the website used in the card footer.',
          type: 'string',
        },
      },
      type: 'object',
    },
    TwitterCardType: {
      enum: ['app', 'player', 'summary', 'summary_large_image'],
      type: 'string',
    },
  },
  type: 'object',
  properties: {
    BaseSeoProps: {
      $ref: '#/definitions/BaseSeoProps',
    },
  },
}
