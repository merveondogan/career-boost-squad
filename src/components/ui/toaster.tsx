
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      {toasts
        .filter(toast => 
          // Filter out any May 19 session toasts completely
          !(toast.title === "Sessions removed" && 
            toast.description && 
            typeof toast.description === 'string' && 
            toast.description.includes("May 19"))
        )
        .map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose onClick={() => dismiss(id)} />
            </Toast>
          )
        })}
      <ToastViewport />
    </ToastProvider>
  )
}
