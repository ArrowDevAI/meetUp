import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import App from "../App";

describe('<CitySearch/> component', () => {
    let CitySearchComponent;
    let cityTextBox;
    beforeEach(() => { //clear Prop and state values?
        CitySearchComponent = render(<CitySearch />);
        cityTextBox = CitySearchComponent.queryByRole('textbox')
    })
    test('renders text input', () => {
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });


    test('renders a list of suggestions when city textbox gains focus',
        async () => {
            const user = userEvent.setup();

            await user.click(cityTextBox);
            const suggestionList = CitySearchComponent.queryByRole('list');
            expect(suggestionList).toBeInTheDocument();
            expect(suggestionList).toHaveClass('suggestions');
        });

    test('update suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents(); //retrieves events from google cal api (or mock data)
        const allLocations = extractLocations(allEvents); //defined in api.js returns "locations" (duplications excluded) only
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />)
        await user.type(cityTextBox, 'Berlin');
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1; //What is indexOf doing?
        }) : [];
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem'); //add list item to CitySearch
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i])
        }
    })
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
     
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        await user.type(cityTextBox, "Berlin");
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
        });
    });

    describe('<CitySearch/> integration', () => {
        let CitySearchComponent;
        let cityTextBox;
        beforeEach(() => { //clear Prop and state values?
            CitySearchComponent = render(<CitySearch />);
            cityTextBox = CitySearchComponent.queryByRole('textbox')
        });

        test('renders suggestions list when the app is rendered.', async () => {
            const user = userEvent.setup();
            const AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
        
            const CitySearchDOM = AppDOM.querySelector('#city-search');
            const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
            await user.click(cityTextBox);
        
            const allEvents = await getEvents();
            const allLocations = extractLocations(allEvents);
        
            expect(suggestionListItems.length).toBe(allLocations.length + 1);
         });

});