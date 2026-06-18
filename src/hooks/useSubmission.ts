import { useMutation } from "@tanstack/react-query";
import { runCode, submitCode } from "@/api/submissions";
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";

export function useRunCode() {
  const setRunOutput = useEditorStore((s) => s.setRunOutput);
  const setRunning = useEditorStore((s) => s.setRunning);
  return useMutation({
    mutationFn: runCode,
    onMutate: () => {
      setRunning(true);
      setRunOutput(null);
    },
    onSuccess: (data) => {
      setRunOutput(data.output);
      toast.success("Code executed");
    },
    onError: (e: Error) => {
      setRunOutput(`Error: ${e.message}`);
      toast.error("Run failed");
    },
    onSettled: () => setRunning(false),
  });
}

export function useSubmitCode() {
  const setVerdict = useEditorStore((s) => s.setVerdict);
  const setSubmitting = useEditorStore((s) => s.setSubmitting);
  return useMutation({
    mutationFn: submitCode,
    onMutate: () => {
      setSubmitting(true);
      setVerdict(null);
    },
    onSuccess: (data) => {
      setVerdict(data);
      if (data.status === "Accepted") toast.success("Accepted!");
      else toast.error(data.status);
    },
    onError: (e: Error) => toast.error(e.message),
    onSettled: () => setSubmitting(false),
  });
}
