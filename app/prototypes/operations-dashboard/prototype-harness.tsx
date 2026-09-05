"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ClubMatrixVariant } from "./variant-club-matrix"
import { CommandCenterVariant } from "./variant-command-center"
import { ReviewDeskVariant } from "./variant-review-desk"

const variants = [
    { name: "Command Center", component: CommandCenterVariant },
    { name: "Review Desk", component: ReviewDeskVariant },
    { name: "Club Matrix", component: ClubMatrixVariant },
]

export function OperationsDashboardHarness() {
    const [current, setCurrent] = useState(0)
    const [replayKey, setReplayKey] = useState(0)
    const pickerRef = useRef<HTMLElement>(null)
    const highlightRef = useRef<HTMLSpanElement>(null)
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
    const ActiveVariant = variants[current].component

    const moveHighlight = useCallback(() => {
        const item = itemRefs.current[current]
        const highlight = highlightRef.current
        if (!item || !highlight) return
        highlight.style.width = `${item.offsetWidth}px`
        highlight.style.transform = `translateX(${item.offsetLeft}px)`
    }, [current])

    const setActive = useCallback((index: number) => {
        if (index < 0 || index >= variants.length) return
        setCurrent(index)
        setReplayKey((key) => key + 1)
        const url = new URL(window.location.href)
        url.searchParams.set("v", String(index + 1))
        window.history.replaceState(null, "", url)
    }, [])

    useEffect(() => {
        const requested = Number.parseInt(new URLSearchParams(window.location.search).get("v") ?? "1", 10) - 1
        if (requested >= 0 && requested < variants.length) setCurrent(requested)
    }, [])

    useLayoutEffect(() => { moveHighlight() }, [moveHighlight])

    useEffect(() => {
        const firstFrame = window.requestAnimationFrame(() => window.requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", "")))
        window.addEventListener("resize", moveHighlight)
        return () => { window.cancelAnimationFrame(firstFrame); window.removeEventListener("resize", moveHighlight) }
    }, [moveHighlight])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement
            if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const number = Number.parseInt(event.key, 10)
            if (number >= 1 && number <= variants.length) setActive(number - 1)
            else if (event.key === "ArrowRight") setActive((current + 1) % variants.length)
            else if (event.key === "ArrowLeft") setActive((current - 1 + variants.length) % variants.length)
            else if (event.key === "r" || event.key === "R") setReplayKey((key) => key + 1)
        }
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [current, setActive])

    return <>
        <div id="stage"><ActiveVariant key={`${current}-${replayKey}`} /></div>
        <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants">
            <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true"></span>
            {variants.map((variant, index) => <button key={variant.name} ref={(element) => { itemRefs.current[index] = element }} className="proto-picker-item" data-active={current === index ? "" : undefined} aria-current={current === index ? "true" : undefined} onClick={() => setActive(index)}>{variant.name}</button>)}
            <span className="proto-picker-divider" aria-hidden="true"></span>
            <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setReplayKey((key) => key + 1)}>↻</button>
        </nav>
    </>
}
