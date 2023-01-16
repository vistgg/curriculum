type FooterData = {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}[];

export const data: FooterData = [
  {
    title: "navigation:footer.about.title",
    links: [
      {
        href: "/about",
        title: "navigation:footer.about.origin"
      },
      {
        href: "/blog",
        title: "navigation:footer.about.blog"
      },
      {
        href: "/about/changelog",
        title: "navigation:footer.about.changelog"
      }
    ]
  },
  {
    title: "navigation:footer.support.title",
    links: [
      {
        href: "/support/contact",
        title: "navigation:footer.support.contact"
      }
    ]
  },
  {
    title: "navigation:footer.platform.title",
    links: [
      {
        href: "/legal",
        title: "navigation:footer.platform.terms-and-privacy"
      },
      {
        href: "/pricing",
        title: "navigation:footer.platform.pricing"
      },
      {
        href: "/faq",
        title: "navigation:footer.platform.faq"
      }
    ]
  }
];
