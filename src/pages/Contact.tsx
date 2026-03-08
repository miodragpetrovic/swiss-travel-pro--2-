import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "./_PageShell";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { useI18n } from "../i18n/i18n";

export function Contact(): JSX.Element {
  const { t, lang } = useI18n();
  const [sent, setSent] = React.useState(false);

  return (
    <PageShell title={t("contact.title")} subtitle={t("contact.subtitle")}>
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card className="p-5">
            <div className="text-sm font-extrabold">{lang === "de" ? "Nachricht senden" : "Send a message"}</div>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-2 md:grid-cols-2">
                <Input required name="name" placeholder={lang === "de" ? "Name" : "Name"} />
                <Input required type="email" name="email" placeholder={lang === "de" ? "E‑Mail" : "Email"} />
              </div>
              <Input name="subject" placeholder={lang === "de" ? "Betreff" : "Subject"} />
              <Textarea required name="message" placeholder={lang === "de" ? "Wie können wir helfen?" : "How can we help?"} />
              <Button type="submit" className="w-full">
                {lang === "de" ? "Senden" : "Send"}
              </Button>
              {sent && (
                <div className="rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
                  {lang === "de" ? "Danke! Wir melden uns (Demo)." : "Thanks! We'll reply (demo)."}
                </div>
              )}
            </form>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5">
            <div className="text-sm font-extrabold">{t("contact.office")}</div>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                <div>
                  Bahnhofstrasse 1<br />8001 Zürich, Schweiz
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                +41 00 000 00 00
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                hello@example.com
              </div>
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-500">{t("contact.hours")}</div>
                <div className="text-sm font-bold text-slate-800">{t("contact.hoursValue")}</div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <iframe
              title="Map"
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=8.534%2C47.366%2C8.548%2C47.373&layer=mapnik"
            />
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
