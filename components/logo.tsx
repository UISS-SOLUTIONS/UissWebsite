import { cn } from '@/lib/utils'

type LogoProps = {
    className?: string
    inverse?: boolean
}

export const Logo = ({ className, inverse = false }: LogoProps) => (
    <svg
        viewBox="0 0 320 90"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="UISS"
        className={cn('h-auto w-40', className)}
    >
        <g
            fill="none"
            stroke="#D8A13A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(20,15)"
        >
            <path d="M 26 12 L 8 30 L 26 48" />
            <path d="M 50 12 L 68 30 L 50 48" />
            <line x1="43" y1="8" x2="33" y2="52" />
        </g>
        <text
            x="112"
            y="58"
            fontFamily="var(--font-uiss-wordmark), Poppins, sans-serif"
            fontWeight="800"
            fontSize="44"
            letterSpacing="0.5"
            fill={inverse ? '#FFFFFF' : '#111111'}
        >
            UISS
        </text>
    </svg>
)

export const LogoIcon = ({ className }: Pick<LogoProps, 'className'>) => (
    <svg
        viewBox="0 0 90 90"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="UISS mark"
        className={cn('h-10 w-10', className)}
    >
        <g
            fill="none"
            stroke="#D8A13A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(10,15)"
        >
            <path d="M 26 12 L 8 30 L 26 48" />
            <path d="M 50 12 L 68 30 L 50 48" />
            <line x1="43" y1="8" x2="33" y2="52" />
        </g>
    </svg>
)
