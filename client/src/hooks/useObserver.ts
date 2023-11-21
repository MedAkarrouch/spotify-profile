import { useRef, useEffect } from "react"
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1
}
export const useObserver = (handler: () => void, ...dependecyArray: any[]) => {
  const lastItemRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return
      else handler()
    }, options)
    if (lastItemRef.current) observer.observe(lastItemRef.current)
    return () => observer.disconnect()
  }, [...dependecyArray])
  return lastItemRef
}
