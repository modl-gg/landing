import MarkdownPage from "@/components/MarkdownPage";
import privacyPolicyContent from "../content/modl_privacy_policy.md?raw";

export default function PrivacyPolicy() {
  return <MarkdownPage content={privacyPolicyContent} />;
}
