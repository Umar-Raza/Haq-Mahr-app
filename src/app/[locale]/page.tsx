import { notFound } from "next/navigation";
import { Methodology } from "@/components/calculator/methodology";
import { Container } from "@/components/layout/container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <div>
        <h1 className="text-3xl font-semibold text-base-content">
          {dict.home.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{dict.home.intro}</p>
      </div>
      <div className="max-w-3xl">
        <Methodology locale={locale} dict={dict.methodology} />
      </div>
    </Container>
  );
}
