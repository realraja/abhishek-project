import { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export const DialogContext = ({
    showDialog,
    onClose,
    children,
    title,
    closeOnOutsideClick = false,
  width = 'max-w-md'
}) => {
    const dialogRef = useRef(null);
    const [isVisible, setIsVisible] = useState(showDialog);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    useEffect(() => {
        setIsVisible(showDialog);
    }, [showDialog]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (closeOnOutsideClick &&
                dialogRef.current &&
                !dialogRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeOnOutsideClick]);

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-screen z-50" />

            {/* Dialog - Fixed centering */}
            <div className="fixed inset-0 z-50 flex items-center p-4 justify-center overflow-auto">
                <div
                    ref={dialogRef}
                    className={`w-full ${width} bg-white text-black rounded-2xl border border-gray-200 shadow-2xl overflow-auto scrollEditclass max-h-full`}
                >
                    <div className=" p-4">
                        <div className="flex items-center justify-end">
                            <button
                                onClick={handleClose}
                                className="absolute z-10 p-1.5 -mr-8 -mt-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <IoClose size={18} />
                            </button>
                        </div>

                        <div className="p-2">
                          {title && <div className="text-xl mb-2 font-bold">{title}</div>}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};