import React from "react";

interface ErrorNotificationProps {
  title?: string;
  description?: string;
}

function closeAfterTimeout() {
  setTimeout(() => {
    const element = document.querySelector(".absolute.end-0.top-0");
    if (element) {
      element.remove();
    }
  }, 5000);
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  title = "An unexpected error occurred",
  description = "Please contact support!",
}) => {
  closeAfterTimeout();
  return (
    <div className="absolute end-0 top-0">
      <div
        className="max-w-xs rounded-xl border border-old-rose-200 bg-old-rose-50 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-toast-placement-top-right-label"
      >
        <div className="p-2 sm:p-4">
          <h3
            id="hs-toast-placement-top-right-label"
            className="text-xs font-semibold text-old-rose-800 sm:text-base dark:text-old-rose-50"
          >
            <div
              role="alert"
              className="rounded border-s-4 border-old-rose-500 bg-old-rose-50 p-4"
            >
              <div className="flex items-center gap-2 text-old-rose-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <strong className="block font-medium"> {title} </strong>
              </div>

              <p className="mt-2 text-sm text-old-rose-700">{description}</p>
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
