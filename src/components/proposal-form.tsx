"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { projectTypes, proposalLabels } from "@/data/proposal";
import { proposalSchema, type Proposal, type ProposalErrors } from "@/lib/proposal-schema";

const textFields = [
  { name: "name", type: "text", autoComplete: "name", maxLength: 120 },
  { name: "company", type: "text", autoComplete: "organization", maxLength: 160 },
  { name: "phone", type: "tel", autoComplete: "tel", maxLength: 28 },
  { name: "email", type: "email", autoComplete: "email", maxLength: 254 },
] as const;

const messages: Record<string, string> = {
  validation: "შეამოწმეთ მონიშნული ველები.",
  invalid: "მოთხოვნა ვერ დამუშავდა. სცადეთ ხელახლა.",
  too_large: "ტექსტი ძალიან გრძელია. შეამცირეთ აღწერის სიგრძე.",
  rate_limit: "მოთხოვნების ლიმიტი ამოიწურა. სცადეთ მოგვიანებით.",
  unconfigured: "განვითარების რეჟიმი. მიწოდება ჯერ არ არის ჩართული და მოთხოვნა არ გაგზავნილა.",
  delivery_failed: "მოთხოვნის მიღება ვერ დადასტურდა. სცადეთ ხელახლა.",
  network: "კავშირი შეწყდა. სცადეთ ხელახლა.",
};

export function ProposalForm({ deliveryReady }: { deliveryReady: boolean }) {
  const [fields, setFields] = useState<ProposalErrors>({});
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const lastRequest = useRef<{ data: string; id: string } | null>(null);
  const busy = useRef(false);

  function showErrors(form: HTMLFormElement, errors: ProposalErrors) {
    setFields(errors);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) requestAnimationFrame(() => {
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const { website, ...values } = Object.fromEntries(new FormData(form));
    setFields({});
    setStatus("");

    const result = proposalSchema.safeParse({ ...values, privacy: values.privacy === "on" });
    if (!result.success) {
      showErrors(form, z.flattenError(result.error).fieldErrors);
      setStatus("validation");
      return;
    }
    if (!deliveryReady) {
      setStatus("unconfigured");
      return;
    }
    const data = JSON.stringify(result.data);
    if (lastRequest.current?.data !== data) lastRequest.current = { data, id: crypto.randomUUID() };
    busy.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: lastRequest.current.id, website, proposal: result.data }),
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.json() as { code?: string; fields?: ProposalErrors };
      if (response.ok && body.code === "accepted") {
        form.reset();
        lastRequest.current = null;
        setStatus("accepted");
      } else {
        if (body.fields) showErrors(form, body.fields);
        setStatus(body.code || "invalid");
      }
    } catch {
      setStatus("network");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function fieldProps(name: keyof Proposal) {
    return { id: name, name, required: true, "aria-invalid": fields[name]?.length ? true : undefined,
      "aria-describedby": fields[name]?.length ? `${name}-error` : undefined };
  }

  function field(name: keyof Proposal, control: ReactNode, wide = false) {
    return (
      <div className={`form-field ${wide ? "full-field" : ""}`} key={name}>
        <label htmlFor={name}>{proposalLabels[name]}</label>
        {control}
        {fields[name]?.[0] && <p id={`${name}-error`} className="field-error">{fields[name][0]}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="proposal-form" method="post" action="/api/proposal" noValidate>
      <noscript><p className="form-preview">ფორმის შესავსებად ჩართეთ JavaScript.</p></noscript>
      {!deliveryReady && <p className="form-preview"><Info size={17} aria-hidden /> განვითარების რეჟიმი. ფორმიდან ელფოსტის მიწოდება ჯერ გამორთულია.</p>}
      <div className="form-grid">
        {textFields.map(({ name, type, autoComplete, maxLength }) => field(name, <input {...fieldProps(name)} type={type} autoComplete={autoComplete} maxLength={maxLength} />))}
        {field("projectType", <select {...fieldProps("projectType")} defaultValue="">
          <option value="" disabled>აირჩიეთ ტიპი</option>
          {Object.entries(projectTypes).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>)}
        {field("location", <input {...fieldProps("location")} type="text" maxLength={200} />)}
        {field("description", <textarea {...fieldProps("description")} rows={5} minLength={20} maxLength={3000}
          placeholder="სამუშაოების ტიპი, მშენებლობის ეტაპი და სავარაუდო ვადები" />, true)}
      </div>
      <div hidden><label htmlFor="website">ვებსაიტი</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="privacy-field">
        <div><input {...fieldProps("privacy")} type="checkbox" />
          <label htmlFor="privacy">გავეცანი <Link href="/privacy">კონფიდენციალურობის პირობებს</Link> და ვეთანხმები მონაცემების გამოყენებას ჩემს მოთხოვნაზე პასუხისთვის.</label></div>
        {fields.privacy?.[0] && <p className="field-error" id="privacy-error">{fields.privacy[0]}</p>}
      </div>
      <button type="submit" className="button button-accent" disabled={pending}>
        {pending ? "იგზავნება…" : "მოთხოვნის გაგზავნა"} <ArrowUpRight size={17} aria-hidden />
      </button>
      <div className="form-feedback" aria-live="polite" aria-atomic="true">
        {status === "accepted" ? <p className="form-success"><CheckCircle2 size={20} aria-hidden /> მოთხოვნა მიღებულია გასაგზავნად.</p>
          : status && <p className="form-error">{messages[status] || messages.invalid}</p>}
      </div>
    </form>
  );
}
