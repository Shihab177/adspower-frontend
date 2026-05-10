"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Tag, Search, CornerDownLeft } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
interface Group {
  id: string;
  name: string;
}

interface TagItem {
  id: string;
  name: string;
}

// ── Default data ──────────────────────────────────────────────
const DEFAULT_GROUPS: Group[] = [
  { id: "ungrouped", name: "Ungrouped" },
  { id: "abc", name: "abc" },
];

const DEFAULT_TAGS: TagItem[] = [];

// ── Component ─────────────────────────────────────────────────
const GroupAndTagsConfig = () => {
  // Group state
  const [groupOpen, setGroupOpen]         = useState(false);
  const [groups, setGroups]               = useState<Group[]>(DEFAULT_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<Group>(DEFAULT_GROUPS[0]);
  const [groupSearch, setGroupSearch]     = useState("");

  // Tags state
  const [tagsOpen, setTagsOpen]       = useState(false);
  const [tags, setTags]               = useState<TagItem[]>(DEFAULT_TAGS);
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);
  const [tagSearch, setTagSearch]     = useState("");

  const groupRef = useRef<HTMLDivElement>(null);
  const tagsRef  = useRef<HTMLDivElement>(null);

  // outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (groupRef.current && !groupRef.current.contains(e.target as Node)) {
        setGroupOpen(false);
        setGroupSearch("");
      }
      if (tagsRef.current && !tagsRef.current.contains(e.target as Node)) {
        setTagsOpen(false);
        setTagSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Group handlers ────────────────────────────────────────
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const handleCreateGroup = () => {
    const name = groupSearch.trim();
    if (!name) return;
    const newGroup: Group = { id: Date.now().toString(), name };
    setGroups((prev) => [...prev, newGroup]);
    setSelectedGroup(newGroup);
    setGroupSearch("");
    setGroupOpen(false);
  };

  const handleGroupKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreateGroup();
  };

  // ── Tag handlers ──────────────────────────────────────────
  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleCreateTag = () => {
    const name = tagSearch.trim();
    if (!name) return;
    const newTag: TagItem = { id: Date.now().toString(), name };
    setTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, newTag]);
    setTagSearch("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreateTag();
  };

  const toggleTag = (tag: TagItem) => {
    setSelectedTags((prev) =>
      prev.find((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex items-start gap-3 ">
      <div className="flex items-start gap-2 w-2xl">
        {/* ── Group Dropdown ── */}
        <div className="relative flex-1" ref={groupRef}>
          <button
            onClick={() => {
              setGroupOpen((p) => !p);
              setTagsOpen(false);
            }}
            className={`w-full flex items-center justify-between h-10 px-3 border rounded-md text-sm bg-white transition-colors ${
              groupOpen ? "border-blue-500" : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <span className="text-gray-700">{selectedGroup.name}</span>
            {groupOpen ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </button>

          {groupOpen && (
            <div className="absolute z-50 top-11 left-0 w-full bg-white border border-blue-400 rounded-md shadow-lg">
              {/* Search / Create input */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                <input
                  autoFocus
                  type="text"
                  value={groupSearch}
                  onChange={(e) => setGroupSearch(e.target.value)}
                  onKeyDown={handleGroupKeyDown}
                  placeholder="Find a group / Create a group"
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                />
                <ChevronUp size={16} className="text-gray-400 shrink-0" />
              </div>

              {/* Create hint */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Plus size={14} />
                  <span>
                    {groupSearch.trim()
                      ? `Create "${groupSearch.trim()}"`
                      : "Enter a new group name in the input box above"}
                  </span>
                </div>
                <button
                  onClick={handleCreateGroup}
                  disabled={!groupSearch.trim()}
                  className="flex items-center gap-1 px-3 py-1 rounded text-sm bg-blue-100 text-blue-500 disabled:opacity-40 hover:bg-blue-200 transition-colors"
                >
                  Create <CornerDownLeft size={13} />
                </button>
              </div>

              {/* Group list */}
              <div className="max-h-48 overflow-y-auto py-1">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setSelectedGroup(g);
                        setGroupOpen(false);
                        setGroupSearch("");
                      }}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
                    >
                      <span className={g.id === selectedGroup.id ? "text-blue-500 font-medium" : "text-gray-700"}>
                        {g.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-400 py-3">No more content</p>
                )}
                {filteredGroups.length > 0 && (
                  <p className="text-center text-xs text-gray-400 py-2">No more content</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Tags Dropdown ── */}
        <div className="relative" ref={tagsRef}>
          <button
            onClick={() => {
              setTagsOpen((p) => !p);
              setGroupOpen(false);
            }}
            className={`flex items-center gap-2 h-10 px-3 border rounded-md text-sm font-medium transition-colors ${
              tagsOpen
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-blue-500 bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Tag size={14} />
            <span>Tags</span>
            {tagsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {tagsOpen && (
            <div className="absolute z-50 top-11 right-0 w-64 bg-white border border-blue-400 rounded-md shadow-lg">
              {/* Tag search input */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Find a tag / Create a tag"
                  className="flex-1 text-sm outline-none placeholder-gray-400"
                />
              </div>

              {/* Tag list */}
              <div className="max-h-48 overflow-y-auto py-1">
                {filteredTags.length > 0 ? (
                  filteredTags.map((t) => {
                    const isSelected = !!selectedTags.find((s) => s.id === t.id);
                    return (
                      <div
                        key={t.id}
                        onClick={() => toggleTag(t)}
                        className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="accent-blue-500"
                        />
                        <span className={isSelected ? "text-blue-500" : "text-gray-700"}>
                          {t.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-sm text-gray-400 py-4">No data</p>
                )}
              </div>

              {/* Create tag hint */}
              {tagSearch.trim() && (
                <div className="border-t border-gray-100 px-3 py-2">
                  <button
                    onClick={handleCreateTag}
                    className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
                  >
                    <Plus size={13} />
                    Create &quot;{tagSearch.trim()}&quot;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupAndTagsConfig;