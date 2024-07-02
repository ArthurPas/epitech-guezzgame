/* eslint-disable max-lines-per-function */
import plugin from 'tailwindcss/plugin';

export const responsiveFontSizes = plugin(function ({ addUtilities }) {
    const utilities = {
        '.title-large': {
            fontSize: 'var(--title-large-mobile-font-size)',
            lineHeight: 'var(--title-large-mobile-line-height)',
            fontWeight: 'bold',
            fontFamily: 'var(--font-primary)',
            letterSpacing: '0.04em',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',

            '@screen sm': {
                fontSize: 'var(--title-large-tablet-font-size)',
                lineHeight: 'var(--title-large-tablet-line-height)'
            },

            '@screen lg': {
                fontSize: 'var(--title-large-tablet-and-laptop-font-size)',
                lineHeight: 'var(--title-large-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--title-large-desktop-font-size)',
                lineHeight: 'var(--title-large-desktop-line-height)'
            }
        },

        '.title-medium': {
            fontSize: 'var(--title-medium-mobile-font-size)',
            lineHeight: 'var(--title-medium-mobile-line-height)',
            fontFamily: 'var(--font-secondary)',

            '@screen sm': {
                fontSize: 'var(--title-medium-tablet-and-laptop-font-size)',
                lineHeight: 'var(--title-medium-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--title-medium-desktop-font-size)',
                lineHeight: 'var(--title-medium-desktop-line-height)'
            }
        },

        '.title-small': {
            fontSize: 'var(--title-small-mobile-font-size)',
            lineHeight: 'var(--title-small-mobile-line-height)',
            fontFamily: 'var(--font-secondary)',

            '@screen sm': {
                fontSize: 'var(--title-small-tablet-and-laptop-font-size)',
                lineHeight: 'var(--title-small-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--title-small-desktop-font-size)',
                lineHeight: 'var(--title-small-desktop-line-height)'
            }
        },

        '.paragraph': {
            fontSize: 'var(--paragraph-font-size)',
            lineHeight: 'var(--paragraph-line-height)',
            fontFamily: 'var(--font-secondary)',

            '@screen sm': {
                fontSize: 'var(--paragraph-tablet-and-laptop-font-size)',
                lineHeight: 'var(--paragraph-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--paragraph-desktop-font-size)',
                lineHeight: 'var(--paragraph-desktop-line-height)'
            }
        },

        '.paragraph-large': {
            fontSize: 'var(--paragraph-large-font-size)',
            lineHeight: 'var(--paragraph-large-line-height)',
            fontFamily: 'var(--font-secondary)',

            '@screen md': {
                fontSize: 'var(--paragraph-large-tablet-and-laptop-font-size)',
                lineHeight: 'var(--paragraph-large-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--paragraph-large-desktop-font-size)',
                lineHeight: 'var(--paragraph-large-desktop-line-height)'
            }
        },

        '.link': {
            fontSize: 'var(--link-font-size)',
            lineHeight: 'var(--link-line-height)',
            color: 'white',
            cursor: 'pointer',

            '&:hover': {
                opacity: '0.7',
                textDecoration: 'none'
            },

            '@screen sm': {
                fontSize: 'var(--link-tablet-and-laptop-font-size)',
                lineHeight: 'var(--link-tablet-and-laptop-line-height)'
            },

            '@screen 4xl': {
                fontSize: 'var(--link-desktop-font-size)',
                lineHeight: 'var(--link-desktop-line-height)'
            }
        },

        '.bg-global-gradient': {
            backgroundImage: 'linear-gradient(to bottom, #c44fed, #8c28c1, #6f1eae)',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            height: '100vh',
            overflowX: 'hidden'
        }
    };

    addUtilities(utilities);
});
