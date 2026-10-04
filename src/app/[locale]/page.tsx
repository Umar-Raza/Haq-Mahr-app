import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-semibold text-base-content">
        {dict.home.heading}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{dict.home.intro}</p>
    </Container>
  );
}
