import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { ArrowRight, ChevronRight, Menu, X, MapPin, Plane, Globe, Compass, Calendar, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring' as const,
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="/travel_hero_background.png"
                                alt="background"
                                className="absolute inset-x-0 top-0 -z-20 h-full w-full object-cover opacity-60"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6 relative">
                            {/* Floating Travel Icons */}
                            <motion.div 
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-10 top-20 text-blue-400/30 hidden lg:block"
                            >
                                <Plane size={48} />
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute right-20 top-40 text-emerald-400/30 hidden lg:block"
                            >
                                <Globe size={48} />
                            </motion.div>
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                        
                                    <div className="flex justify-center mb-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium backdrop-blur-md">
                                            <Plane className="size-3" />
                                            <span>Your ultimate travel companion</span>
                                        </div>
                                    </div>
                                    <h1
                                        className="max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-4 xl:text-[5.5rem] font-bold tracking-tight leading-[1.1]">
                                        Discover the Extraordinary. <br />
                                        <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">Travel Seamlessly.</span>
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed">
                                        TraveLoop turns your wanderlust into reality. From hidden gems to iconic landmarks, plan your entire journey with AI-powered itineraries and local insights.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.1,
                                                    delayChildren: 1.2,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 max-w-4xl mx-auto"
                                >
                                    {/* Travel Search Bar */}
                                    <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4">
                                        <div className="flex-1 w-full flex items-center gap-3 px-4 border-r border-white/10 last:border-r-0">
                                            <MapPin className="text-blue-400 size-5 shrink-0" />
                                            <div className="text-left flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Where to?</span>
                                                <input type="text" placeholder="Search destinations" className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 w-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full flex items-center gap-3 px-4 border-r border-white/10 last:border-r-0">
                                            <Calendar className="text-emerald-400 size-5 shrink-0" />
                                            <div className="text-left flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">When?</span>
                                                <input type="text" placeholder="Select dates" className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 w-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full flex items-center gap-3 px-4 border-r border-white/10 last:border-r-0">
                                            <Users className="text-amber-400 size-5 shrink-0" />
                                            <div className="text-left flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Who?</span>
                                                <input type="text" placeholder="Add guests" className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 w-full" />
                                            </div>
                                        </div>
                                        <Button asChild size="lg" className="w-full md:w-auto rounded-xl px-8 bg-blue-500 hover:bg-blue-600">
                                            <Link to="/signup">
                                                <Search className="mr-2 size-4" />
                                                Search
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-8 text-base bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 border-none shadow-lg shadow-blue-500/20">
                                            <Link to="/signup">
                                                <span className="text-nowrap">Plan Your Trip</span>
                                                <ArrowRight className="ml-2 size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="rounded-xl px-8 backdrop-blur-sm border-white/10">
                                            <Link to="/signup">
                                                <span className="text-nowrap">Explore Destinations</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background/20 backdrop-blur-md relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 p-4 shadow-2xl shadow-black/50 ring-1">
                                    <img
                                        className="aspect-15/8 relative rounded-2xl object-cover"
                                        src="/trip_dashboard_mockup.png"
                                        alt="TraveLoop Trip Dashboard"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '/signup' },
    { name: 'Solution', href: '/signup' },
    { name: 'Pricing', href: '/signup' },
    { name: 'About', href: '/signup' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <SignedOut>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className={cn(isScrolled && 'text-blue-400')}>
                                        <Link to="/login">
                                            <span>Login</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className={cn(isScrolled && 'lg:hidden')}>
                                        <Link to="/signup">
                                            <span>Sign Up</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                        <Link to="/signup">
                                            <span>Get Started</span>
                                        </Link>
                                    </Button>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="text-emerald-400">
                                            <Link to="/dashboard">
                                                <span>Dashboard</span>
                                            </Link>
                                        </Button>
                                        <UserButton />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <Compass className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground italic">TraveLoop</span>
        </div>
    )
}
