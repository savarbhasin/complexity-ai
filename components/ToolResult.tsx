import URLGrid from "./URLGrid";
import { motion } from 'framer-motion';

export const ToolResult = ({ result }: {result:string}) => {
    const resultData = JSON.parse(result);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-hidden"
      >
        {
          resultData.urls && (
            <URLGrid urls={resultData.urls} />
          ) 
        }
      </motion.div>
    );
  };