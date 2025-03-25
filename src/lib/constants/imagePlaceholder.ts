export const imagePlaceholder = (sizes?: string, title?: string) => {
  if (sizes && title)
    return `https://dummyimage.com/${sizes}/FF385C/fff.png&text=${title}`
  if (title) return `https://dummyimage.com/400/FF385C/fff.png&text=${title}`
  if (sizes) return `https://dummyimage.com/${sizes}/FF385C/fff.png&text=airbnb`
  return 'https://dummyimage.com/400/FF385C/fff.png&text=airbnb'
}
