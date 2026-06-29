interface FormFeedbackProps {
  message?: string;
  hint?: string;
}

export default function FormFeedback({ message, hint }: FormFeedbackProps) {
  if (!message) return null;

  return (
    <div className="mt-1.5 text-xs" role="alert">
      <p className="text-red-600 font-medium">{message}</p>
      {hint && <p className="text-text-light mt-0.5 leading-relaxed">{hint}</p>}
    </div>
  );
}
