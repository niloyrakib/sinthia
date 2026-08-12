import { wpClient } from "@/lib/wp/client";
import { WP_CONFIG } from "@/lib/wp/config";
import { withWpFallback } from "@/lib/wp/with-fallback";
import type { NewsletterFormValues } from "@/lib/validations/newsletter";

async function subscribeViaWp(
  values: NewsletterFormValues,
): Promise<{ success: boolean }> {
  await wpClient.post(`/${WP_CONFIG.customNamespace}/newsletter`, values);
  return { success: true };
}

async function subscribeViaMock(
  values: NewsletterFormValues,
): Promise<{ success: boolean }> {
  void values;
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true };
}

export function subscribeToNewsletter(
  values: NewsletterFormValues,
): Promise<{ success: boolean }> {
  return withWpFallback(
    "subscribeToNewsletter",
    () => subscribeViaWp(values),
    () => subscribeViaMock(values),
  );
}
