import React, { useState } from 'react';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface SearchButtonNavProps {
    placeholder: string;
    inputId?: string;
    onSearch: (query: string) => void; // Add the new prop
}

const SearchButtonNav: React.FC<SearchButtonNavProps> = ({ placeholder, inputId, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2 px-4 flex-grow">
                <Icons.search className="size-4 md:size-5" />
                <input
                    id={inputId}
                    type="text"
                    placeholder={placeholder}
                    className="bg-transparent text-sm sm:text-base text-muted-foreground/80 outline-none flex-1"
                    onChange={handleInputChange}
                    value={searchTerm}
                />
            </div>
            <Button
                size="lg"
                variant="secondary"
                className="h-10 md:h-12 rounded-full"
                onClick={handleSearchClick}
            >
                Buscar
            </Button>
        </div>
    );
}

export default SearchButtonNav;
