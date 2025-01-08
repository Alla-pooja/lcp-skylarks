import { Person as PersonIcon, TableRows as TableRowsIcon, Window as WindowIcon } from '@mui/icons-material';
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomIconButton from "../../../../../components/CustomIconButton";
import { useHandleRouteClick } from "../../../../../routes/hooks";
import { getEntities } from '../../../../../store/analysis/analysisThunk';
import { EntitiesType } from "../../../../../store/analysis/entitiesSlice";
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import EntitySearch from "./Publications/SpecificPublication/EntitySearch";
import { EntityGrid } from '../../Entities/components/EntityGrid';
import { routes } from '../../../../../routes';

export interface TabRecord {
  id: string | number;
  title: string;
  disabled?: boolean;
  component: React.ReactNode;
}

interface EntityOption {
  id: string;
  name: string;
  count?: number;
}

const entityOptions = {
  events: [
    { id: 'e1', name: 'Cricket World Cup', count: 150 },
    { id: 'e2', name: 'Elections 2024', count: 120 },
    { id: 'e3', name: 'Olympics', count: 100 },
    { id: 'e4', name: 'FIFA World Cup', count: 80 },
    { id: 'e5', name: 'Tech Summit', count: 60 }
  ],
  people: [
    { id: 'p1', name: 'John Doe', count: 200 },
    { id: 'p2', name: 'Jane Smith', count: 180 },
    { id: 'p3', name: 'Bob Johnson', count: 150 },
    { id: 'p4', name: 'Alice Brown', count: 130 },
    { id: 'p5', name: 'Charlie Wilson', count: 100 }
  ],
  locations: [
    { id: 'l1', name: 'New York', count: 300 },
    { id: 'l2', name: 'London', count: 250 },
    { id: 'l3', name: 'Tokyo', count: 200 },
    { id: 'l4', name: 'Paris', count: 180 },
    { id: 'l5', name: 'Mumbai', count: 150 }
  ]
};

export interface TabLayoutProps {
  tabs: TabRecord[];
  getActiveTab: (tab: string) => void;
  getView: (view: boolean) => void;
  handleDrawerOpen(): void;
  openDrawer: boolean;
  setStateVariable?: any;
  getAuthenticitySorted: () => void;
  getRelevanceSorted: () => void;
  setRedFlags: any;
  selectedEntityType: string | null;
  onEntityTypeChange: (entityType: string | null) => void;
}

export default function FilterSection({
  tabs,
  getActiveTab,
  getView,
  handleDrawerOpen,
  openDrawer,
  setStateVariable,
  getAuthenticitySorted,
  getRelevanceSorted,
  setRedFlags,
  selectedEntityType,
  onEntityTypeChange
}: TabLayoutProps) {
  const theme = useTheme();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const { allEntities } = useAppSelector((state) => state.analysisEntities);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParameters] = useSearchParams();
  const [activeTab, setActiveTab] = useState(state?.activeTab || tabs[0].id);
  const [sortedValue, setsortedValue] = useState("relevance");
  const [subtype, setSubType] = useState("all posts");
  const [listView, setListView] = useState(false);
  const [contentType, setContentType] = useState('publication');
  const [selectedSource, setSelectedSource] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [selectedLocations, setSelectedLocations] = useState('');


  const [filteredEntities, setFilteredEntities] = useState<{

    people: any[];
    events: any[];
    locations: any[];
  }>({
    people: [],
    events: [],
    locations: []
  });
  console.log("🚀 ~ filteredEntities:", filteredEntities)
  const subType = [
    { id: "all-posts", text: "All Posts" },
    { id: "top-sources", text: "Top Sources" },
    { id: "most-mentioned", text: "Most Mentioned" },
    { id: "most-used-hashtags", text: "Most Used Hashtags" },
    { id: "most popular", text: "Most Popular" },
  ];
  

  const sources = [
    { id: "all", text: "All" },
    { id: "news", text: "News" },
    { id: "twitter", text: "Twitter" },
    { id: "facebook", text: "Facebook" },
    { id: "instagram", text: "Instagram" },
    { id: "youtube", text: "Youtube" },
    { id: "linkedin", text: "Linkedin" },
    { id: "weibo", text: "Weibo" },
    { id: "indiatoday", text: "Indiatoday" },
    { id: "cnn", text: "CNN" },
    { id: "bbc", text: "BBC" },
  ];

  const relevance = [
    { id: "relevance", text: "Relevance" },
    { id: "autenticity", text: "Authenticity" },
  ];
  const navigate = useNavigate();
  const handleRouteClick = useHandleRouteClick();


  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    getActiveTab(tab);
  };

  const handleRiskFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsortedValue(e.target.value);
  };

  const handleTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubType(e.target.value);
  };

  const handleView = () => {
    setListView((prev) => !prev);
  };

  const handleFilter = () => {
    handleDrawerOpen();
  };

  const handleRedFlags = (value: string[]) => {
    setRedFlags(value);
  };

  const handleSelectedEntities = (selectedEntities: EntitiesType[]) => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedEntities.length > 0) {
      const entityIds = selectedEntities
        .map(entity => (entity as any)._id['$oid'])
        .join(',');
      newParams.set('specific_entity', entityIds);
    } else {
      newParams.delete('specific_entity');
    }

    setSearchParams(newParams);
  };

  const handleContentTypeChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value);
    getActiveTab(event.target.value); // This will switch between Publications and Images
  };

  const handleSourceChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedSource(value);
    if (value === 'all') {
      setStateVariable(sources)
    } else {
      setStateVariable([{ id: value, text: value }]);

    }
  };

  useEffect(() => {
    getView(listView);
  }, [listView]);



  // const handleSortChange = (selectedOptionId: string) => {
  //   if (selectedOptionId === "autenticity") {
  //     getAuthenticitySorted();
  //   } else if (selectedOptionId === "relevance") {
  //     getRelevanceSorted();
  //   }
  // };

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortBy(value);

    let sortByValue = "";
    switch (value) {
      case "Most Recent":
        sortByValue = "recent";
        break;
      case "autenticity":
        sortByValue = "autenticity";
        getAuthenticitySorted();
        break;
      case "relevance":
      default:
        sortByValue = "relevance";
        getRelevanceSorted();
        break;
    }
    setSortBy(sortByValue);
  };

  // Update the chip onClick handler
  // const handleEntityClick = (type: string) => {
    // onEntityTypeChange(selectedEntityType === type ? null : type);
  // };
  // const handleEntityClick = (type: string, value: string) => {
  //   console.log(type, value);

  //   if (value === 'view-all') {
  //     // Navigate to the entities tab
  //     handleRouteClick(`${routes.home.path}?tab=analysis&subtab=entities`);
  //   } else {
  //     onEntityTypeChange(value);
  //   }
  // };
  // const handleEntityClick = (type: string, value: string) => {
  //   console.log(type, value);

  //   const queryId = new URLSearchParams(window.location.search).get('query'); // Get the current query ID from the URL
  //   console.log("query id",queryId)

  //   // Handle 'view-all' scenario (navigate to the full list of entities)
  //   if (value === 'view-all') {
  //     // Navigate to the entities tab with the current query ID
  //     handleRouteClick(`${routes.home.path}?tab=home&subtab=entities&query=${queryId}`);
  //   } else {
  //     // For other cases, navigate to the feed section with the specific entity
  //     const specificEntity = value;  // Assuming 'value' holds the specific entity ID or identifier
  //     const path = routes.home.path;

  //     // Construct query parameters for the feed section
  //     const searchParams = new URLSearchParams({
  //       tab: 'home',
  //       subtab: 'entities',
  //       query: queryId || '',  // Use the current query ID
  //       specific_entity: specificEntity
  //     });

  //     // Use handleRouteClick to navigate to the feed section
  //     handleRouteClick(`${path}?${searchParams.toString()}`);
  //   }
  // };

 
  const formControlStyles = {
    minWidth: 180,
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.darkCardBackground,
      '& fieldset': {
        borderColor: theme.palette.primary.tertiary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.text.disabled,
      fontSize: '14px',  // Reduced label size
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiSelect-select': {  // Add this for dropdown text
      fontSize: '14px',
      padding: '6px 14px',  // Reduced padding to match text size
    },
    '& .MuiMenuItem-root': {  // Add this for menu items
      fontSize: '14px',
    }
  };

  useEffect(() => {


    // Group entities by type and get top 5 for each
    const groupedEntities = allEntities.reduce((acc: any, entity: any) => {
      const type = entity.type.toLowerCase();

      // Map API types to our dropdown categories
      let category;
      if (type === 'person') category = 'people';
      else if (type === 'event') category = 'events';
      else if (type === 'location') category = 'locations';
      else return acc;

      if (!acc[category]) acc[category] = [];
      acc[category].push(entity);
      return acc;
    }, { people: [], events: [], locations: [] });

    // Sort by mentions and get top 5 for each category
    Object.keys(groupedEntities).forEach(category => {
      groupedEntities[category] = groupedEntities[category]
        .sort((a: any, b: any) => b.mentions - a.mentions)
        .slice(0, 5);
    });

    setFilteredEntities(groupedEntities);
  }, [allEntities]);

  useEffect(() => {
    let queryId = queryParameters.get("query");
    console.log("query id",queryId)
    if (queryId) {
      dispatch(getEntities(queryId)).then((res) => {
        // console.log(res);

      }).catch((e) => {
        console.log(e);

      }).finally(() => {

      })
    }
  }, [queryParameters]);

  const handleEntityClick = (type: string, value: string) => {
        onEntityTypeChange(value);
console.log("the values",type,value)
    const queryId = new URLSearchParams(window.location.search).get("query");
    const path = routes.home.path;

    if (value === "view-all") {
      // Handle "View All" action
      const searchParams = new URLSearchParams({
        tab: "home",
        subtab: "entities",
        query: queryId || "",
      });

      handleRouteClick(`${path}?${searchParams.toString()}`);
      window.location.reload(); // Reload the page to reflect changes
    } else {
      // Handle specific entity click
      const specificEntity = value;
      const searchParams = new URLSearchParams({
        tab: "home",
        subtab: "entities",
        query: queryId || "",
        specific_entity: specificEntity,
      });

      // window.location.reload(); // Reload the page to reflect changes
    }
  };

  


  return (

    <Box sx={{ p: 1 }}>
      {/* Search Section */}
      <Box sx={{ mb: 2 }}>
        <EntitySearch onEntitiesChange={handleSelectedEntities} />
      </Box>

      {/* Filters Row */}
      <Box sx={{
        mt: 2,
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: '12px',
        border: `1px solid ${theme.palette.primary.tertiary}`
      }}>
        {/* Left Section - Entity Types */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',

        }}>


          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="subtitle2">Entities:</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Events Dropdown */}
              <FormControl size="small" sx={formControlStyles}>
                <InputLabel>Events</InputLabel>
                <Select
                  value={selectedEvent}
                  label="Events"
                  onChange={(e) => {
                    setSelectedEvent(e.target.value);
                    handleEntityClick('events', e.target.value);
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        '& .MuiMenuItem-root': {
                          fontSize: '14px',
                          padding: '6px 14px',
                        }
                      }
                    }
                  }}
                >
                  {filteredEntities.events.map((event) => (
                    <MenuItem key={event._id.$oid} value={event._id.$oid}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center'
                      }}>
                        <span>{event.name}</span>
                        <Typography variant="caption" color="text.secondary">
                          ({event.mentions})
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    value="view-all"
                    // onClick={() => handleEntityClick("entity", "view-all")}
                  >
                    <Typography color="primary">View All Events</Typography>
                  </MenuItem>

                </Select>
              </FormControl>

              {/* People Dropdown */}
              <FormControl size="small" sx={formControlStyles}>
                <InputLabel>People</InputLabel>
                <Select
                  value={selectedPeople}
                  label="People"
                  onChange={(e) => {
                    setSelectedPeople(e.target.value);
                    handleEntityClick('people', e.target.value);
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        '& .MuiMenuItem-root': {
                          fontSize: '14px',
                          padding: '6px 14px',
                        }
                      }
                    }
                  }}
                >
                  {filteredEntities.people.map((person) => (
                    <MenuItem key={person._id.$oid} value={person._id.$oid}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center'
                      }}>
                        <span>{person.name}</span>
                        <Typography variant="caption" color="text.secondary">
                          ({person.mentions})
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    value="view-all"
                    // onClick={() => handleEntityClick("entity", "view-all")}
                  >
                    <Typography color="primary">View All people</Typography>
                  </MenuItem>

                </Select>
              </FormControl>

              {/* Locations Dropdown */}
              <FormControl size="small" sx={formControlStyles}>
                <InputLabel>Locations</InputLabel>
                <Select
                  value={selectedLocations}
                  label="Locations"
                  onChange={(e) => {
                    setSelectedLocations(e.target.value);
                    handleEntityClick('locations', e.target.value);
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        '& .MuiMenuItem-root': {
                          fontSize: '14px',
                          padding: '6px 14px',
                        }
                      }
                    }
                  }}
                >
                  {filteredEntities.locations.map((location) => (
                    <MenuItem key={location._id.$oid} value={location._id.$oid}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center'
                      }}>
                        <span>{location.name}</span>
                        <Typography variant="caption" color="text.secondary">
                          ({location.mentions})
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    value="view-all"
                    // onClick={() => handleEntityClick("entity", "view-all")}
                  >
                    <Typography color="primary">View All Locations</Typography>
                  </MenuItem>

                </Select>
              </FormControl>
            </Box>
          </Box>


          {/* Right Section - Filters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Content Type Dropdown */}
            <FormControl size="small" sx={formControlStyles}>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={contentType}
                label="Content Type"
                onChange={handleContentTypeChange}
                MenuProps={{  // Add this for consistent menu item styling
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontSize: '14px',
                        padding: '6px 14px',
                      }
                    }
                  }
                }}
              >
                <MenuItem value="publication" >Publications</MenuItem>
                <MenuItem value="image">Images</MenuItem>
              </Select>
            </FormControl>

            {/* Source Platform Dropdown */}
            <FormControl size="small" sx={formControlStyles}>
              <InputLabel>Source Platform</InputLabel>
              <Select
                value={selectedSource}
                label="Source Platform"
                onChange={handleSourceChange}
                MenuProps={{  // Add this for consistent menu item styling
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontSize: '14px',
                        padding: '6px 14px',
                      }
                    }
                  }
                }}
              >
                {sources.map((source: any) => (
                  <MenuItem key={source.id} value={source.id}>
                    {source.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort Results Dropdown */}
            <FormControl size="small" sx={formControlStyles}>
              <InputLabel>Sort Results</InputLabel>
              <Select
                value={sortBy}
                label="Sort Results"
                onChange={handleSortChange}
                MenuProps={{  // Add this for consistent menu item styling
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        fontSize: '14px',
                        padding: '6px 14px',
                      }
                    }
                  }
                }}
              >
                <MenuItem value="relevance">Most Relevant</MenuItem>
                <MenuItem value="autenticity">High Authenticity</MenuItem>
                {/* <MenuItem value="Most Recent">Most Recent</MenuItem> */}
              </Select>
            </FormControl>

            {/* Red Flags Section */}
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
              <Typography variant="subtitle2">
                Red Flags
              </Typography>
              <CustomChipInput
                onHandleChange={(redflags) => {
                  setRedFlags(redflags);
                }}
              />
            </Box> */}


            {/* View Toggle */}
            <CustomIconButton
              sx={{
                width: "36px",
                height: "36px",
                color: theme.palette.text.default
              }}
              onClick={handleView}
            >
              {listView ? <TableRowsIcon /> : <WindowIcon />}
            </CustomIconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
