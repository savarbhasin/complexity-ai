import URLGrid from "@/components/embeds/URLGrid";
import { motion } from 'framer-motion';

export const ToolResult = ({ urls }: {urls:string[]}) => {
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-hidden"
      >
        {
          urls && (
              <URLGrid urls={urls} />
          ) 
        }
      </motion.div>
    );
  };