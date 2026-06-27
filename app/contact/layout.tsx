import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Builder's Central | Property Marketing Services",
  description:
    "Get in touch with Builder's Central. Schedule a consultation, request a quote for 3D tours, virtual staging, drone content, and more.",
  openGraph: {
    title: "Contact — Builder's Central",
    description:
      "Schedule a consultation or request a quote for property marketing services.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
