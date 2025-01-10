import URLGrid from "./URLGrid";
import { motion } from 'framer-motion';

export const ToolResult = ({ result }: {result:string}) => {
    const resultData = JSON.parse(result);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
      >
        {resultData.urls ? (
          <URLGrid urls={resultData.urls} />
        ) : (
          <div className="p-4">
            <pre className="text-gray-300 text-sm overflow-x-auto">
              {JSON.stringify(resultData, null, 2)}
            </pre>
          </div>
        )}
      </motion.div>
    );
  };