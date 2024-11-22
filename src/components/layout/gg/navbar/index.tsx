"use client"

import { ChevronDown, Globe, MapPin, Search, User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { cn } from "@lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-14 right-0 top-0 z-50 transition-colors duration-300",
        isScrolled ? "bg-white" : "bg-transparent"
      )}
    >
      <div className="container flex flex-col items-center">
        <div className="flex w-full justify-between py-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/media/nav-desktop-logo-blue.svg" alt="Grey Goose" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Find Location">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Change Language">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Log In">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <nav className="flex h-16 items-center justify-end w-full">
          <div className="hidden md:flex md:items-center md:space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium uppercase tracking-wide">
                  Products <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products/vodka">Vodka</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products/flavored-vodka">Flavored Vodka</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products/limited-edition">Limited Edition</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium uppercase tracking-wide">
                  Cocktails <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/cocktails/classic">Classic</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cocktails/signature">Signature</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cocktails/seasonal">Seasonal</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" asChild>
              <Link href="/explore" className="text-sm font-medium uppercase tracking-wide">
                Explore
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/buy" className="text-sm font-medium uppercase tracking-wide">
                Buy
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  )
}

