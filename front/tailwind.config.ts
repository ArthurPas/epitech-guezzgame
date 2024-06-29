import { breakpoints } from './src/styles/breakpoints';
import { responsiveFontSizes } from './src/lib/tailwind.plugin';
import type { Config } from 'tailwindcss';
import { Bangers } from 'next/font/google';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        screens: breakpoints,
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        fontSize: {
            xs: '0.75em',
            sm: '0.8rem',
            base: ['1rem', '1.25rem'],
            lg: ['1.33rem', '1.5rem'],
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '56px',
            '5xl': ['3.5rem', '3.75rem'],
            '7xl': ['72px', '64px']
        },
        //TODO: Add custom font family (var(--font-family))
        // fontFamily: {
        //     sans: ['var()']
        // },
        extend: {
            colors: {
                //FROM NBRTLSM
                main: '#c4a1ff',
                mainAccent: '#9e66ff', // not needed for shadcn components
                overlay: 'rgba(0,0,0,0.8)',
                // background color overlay for alert dialogs, modals, etc.

                // light mode
                bg: '#daf5f0',
                text: '#000',
                border: '#000',

                // dark mode
                darkBg: '#0f3730',
                darkText: '#eeefe9',
                darkBorder: '#000',

                //FROM BASE FILE
                // border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'rgb(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'rgba(var(--primary), <alpha-value>)',
                    foreground: 'rgba(var(--primary-foreground), <alpha-value>)'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                base: '87px'
                // lg: 'var(--radius)',
                // md: 'calc(var(--radius) - 2px)',
                // sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                light: '4px 4px 0px 0px #000',
                dark: '4px 4px 0px 0px #000'
            },
            translate: {
                boxShadowX: '4px',
                boxShadowY: '4px',
                reverseBoxShadowX: '-4px',
                reverseBoxShadowY: '-4px'
            },
            fontWeight: {
                base: '500',
                heading: '700'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate'), responsiveFontSizes]
} satisfies Config;

export default config;
