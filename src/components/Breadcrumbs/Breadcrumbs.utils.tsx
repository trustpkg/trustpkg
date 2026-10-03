import Link from "next/link"
import React from "react"
import HomeIcon from "@/assets/home.svg";
import NpmIcon from "@/assets/npm.svg";

interface PathChunk {
    label: string
    isLabelVisible: boolean
    isActive: boolean
    href: React.ComponentProps<typeof Link>['href']
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type PathChunkOptions = Pick<PathChunk, 'Icon' | 'isActive' | 'isLabelVisible'> 

const omittedPathChunk: string[] = [
    'packages',
]

const home: PathChunk = {
    label: 'home',
    isLabelVisible: false,
    isActive: true,
    href: '/',
    Icon: HomeIcon,
}

const pathWithAdditionalParameters: Record<string, PathChunkOptions> = {
    npm: {
        Icon: NpmIcon,
        isActive: false,
        isLabelVisible: false,
    },
    default: {
        Icon: undefined,
        isActive: true,
        isLabelVisible: true,
    }
}

export function resolvePathName (pathName: string): PathChunk[] {
    const chunksList = pathName
        .split('/')
        .filter(Boolean)
    
    const resolvedChunks: PathChunk[] = chunksList.map((chunk, index, array) => {
        console.log({ chunk})

        const link = array
            .slice(0, index + 1)
            .join("/")

        const options = pathWithAdditionalParameters?.[chunk] ?? pathWithAdditionalParameters.default
        const { Icon, isActive, isLabelVisible } = options

        return {
            label: chunk,
            isLabelVisible,
            isActive,
            href: link,
            Icon: Icon
        }
    })  

    const filteredChunks = resolvedChunks.filter((chunk) => !omittedPathChunk.includes(chunk.label))

    return [home, ...filteredChunks]
}