import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SectionContainerProps {
    id: string;
    className?: string;
    children: ReactNode;
}

export function SectionContainer({ id, className, children }: SectionContainerProps) {
    return (
        <section id={id} className={clsx('py-20 md:py-24', className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6"
            >
                {children}
            </motion.div>
        </section>
    );
}
