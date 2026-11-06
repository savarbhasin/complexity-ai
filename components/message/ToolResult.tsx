import { motion } from 'framer-motion';
import URLGrid from '@/components/embeds/URLGrid';

export const ToolResult = ({ urls }: { urls: string[] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="overflow-hidden"
  >
    <URLGrid urls={urls} />
  </motion.div>
);
