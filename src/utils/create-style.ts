type Styles = Omit<CSSStyleDeclaration, "length" | "parentRule">;

export function createStyle(elm: HTMLElement, styles: Partial<Styles>) {
  for (const k of Object.keys(styles)) {
    const key = k as keyof Styles;
    elm.style[key] = styles[key] as any;
  }
}
