import React from 'react';
import { useCopilotAction } from "@copilotkit/react-core";
import { Globe, Search, FileSearch, Twitter, Youtube, FileText } from 'lucide-react';
import URLGrid from './URLGrid';

// Web Content Retrieval
export const WebSearch = () => {
    useCopilotAction({
        name: 'retrieve_web_content',
        available : 'remote',
        parameters: [{
            name: 'query',
            type: 'string',
            required: true
        }],
        
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-gray-800 shadow-md">
                <div className="flex items-center gap-2">
                    <Globe className="text-blue-400" />
                    <span className="font-medium text-gray-200">Web Search</span>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                    Query: {args.query}
                    {
                        status === 'inProgress' ?  <div>Searching..</div> :
                    
                        result.urls && result.urls.length > 0 && <URLGrid urls={result.urls}/>
                    }
                </div>
            </div>
        )
    });
    return null;
};

// Web Scraping
export const WebScraper = () => {
    useCopilotAction({
        name: 'webscrape',
        available : 'remote',
        parameters: [{
            name: 'url',
            type: 'string',
            required: true
        }],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <Search className="text-purple-500" />
                    <span className="font-medium">Web Scraper</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    URL: {args.url}
                    {
                        status === 'inProgress' ?  <div>Searching..</div> :
                    
                        result && result.urls && result.urls.length > 0 && <URLGrid urls={result.urls}/>
                    }
                </div>
            </div>
        )
    });
    return null;
};

// arXiv Search
export const ArxivSearch = () => {
    useCopilotAction({
        name: 'arxiv_search',
        available : 'remote',

        parameters: [{
            name: 'query',
            type: 'string',
            required: true
        }],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <FileSearch className="text-green-500" />
                    <span className="font-medium">arXiv Search</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Query: {args.query}
                   
                </div>
            </div>
        )
    });
    return null;
};

// Twitter Posts
export const TwitterPosts = () => {
    useCopilotAction({
        name: 'get_twitter_posts',
        available : 'remote',

        parameters: [{
            name: 'query',
            type: 'string',
            required: true
        }],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <Twitter className="text-sky-500" />
                    <span className="font-medium">Twitter Search</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Query: {args.query}
                    {
                        status === 'inProgress' ?  <div>Searching..</div> :
                    
                        result && result.urls && result.urls.length > 0 && <URLGrid urls={result.urls}/>
                    }
                </div>
            </div>
            
        )
    });
    return null;
};

// YouTube Videos
export const YouTubeVideos = () => {
    useCopilotAction({
        name: 'get_youtube_videos',
        available : 'remote',

        parameters: [{
            name: 'query',
            type: 'string',
            required: true
        }],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <Youtube className="text-red-500" />
                    <span className="font-medium">YouTube Search</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Query: {args.query}
                    {
                        status === 'inProgress' ?  <div>Searching..</div> :
                    
                        result.urls && result.urls.length > 0 && <URLGrid urls={result.urls}/>
                    }
                </div>
            </div>
        )
    });
    return null;
};

// YouTube Video Summarizer
export const YouTubeSummarizer = () => {
    useCopilotAction({
        name: 'summarize_youtube_video',
        available : 'remote',

        parameters: [{
            name: 'url',
            type: 'string',
            required: true
        }],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <FileText className="text-orange-500" />
                    <span className="font-medium">Video Summary</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Video ID: {args.url}
                </div>
            </div>
        )
    });
    return null;
};

// Search Specified Domains
export const SearchSpecifiedDomains = () => {
    useCopilotAction({
        name: 'search_on_any_website',
        available : 'remote',

        parameters: [{
            name: 'query',
            type: 'string',
            required: true
        },{
            name: 'domain',
            type: 'string',
            required: true
        }
        ],
        render: ({ args, status, result }) => (
            <div className="p-4 rounded-lg bg-white shadow-md">
                <div className="flex items-center gap-2">
                    <Globe className="text-blue-500" />
                    <span className="font-medium">Search Specified Domains</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    Query: {args.query}
                    {
                        status === 'inProgress' ?  <div>Searching..</div> :
                    
                        result.urls && result.urls.length > 0 && <URLGrid urls={result.urls}/>
                    }
                </div>
            </div>
        )
    })
    return null;
}

const CopilotTools = () => {
    return (
        <div className="space-y-4">
            <WebSearch />
            <WebScraper />
            <ArxivSearch />
            <TwitterPosts />
            <YouTubeVideos />
            <YouTubeSummarizer />
            <SearchSpecifiedDomains/>
        </div>
    );
};

export default CopilotTools;