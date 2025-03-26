"""Script to scrape articles from old OceanParcels website."""

import requests
from bs4 import BeautifulSoup
import json
import re
import sys


def scrape_articles(url):
    try:
        # Fetch the webpage
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all card elements
        cards = soup.find_all('div', class_='card')

        # List to store extracted article information
        articles = []

        # Process each card
        for card in cards:
            try:
                # Extract title from h5 element
                title_elem = card.find('h5')
                title = title_elem.get_text(strip=True) if title_elem else ''

                # Extract authors (text immediately after h5)
                authors = ''
                if title_elem and title_elem.next_sibling:
                    authors = (
                        title_elem.next_sibling.strip()
                        if isinstance(title_elem.next_sibling, str)
                        else ''
                    )

                # Extract DOI from card-link
                # Extract DOI from card-link
                doi_link = card.find(
                    'a', class_='card-link', href=lambda href: href and 'doi' in href
                )
                if doi_link:
                    doi = doi_link.get('href', '')

                # Extract abstract from card-body
                card_body = card.find('div', class_='card-body')
                abstract = card_body.get_text(strip=True) if card_body else ''

                # Create article dictionary
                article = {
                    'title': title,
                    'authors': authors,
                    'doi': doi,
                    'abstract': abstract,
                }

                articles.append(article)

            except Exception as card_error:
                print(f"Error processing card: {card_error}")
                print('Problematic card HTML:')
                print(card.prettify())
                sys.exit(1)

        # Make articles chronological
        articles.reverse()

        # Save to JSON file
        with open('articles.json', 'w', encoding='utf-8') as f:
            json.dump(articles, f, indent=2, ensure_ascii=False)

        print(f"Successfully scraped {len(articles)} articles.")
        return articles

    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        sys.exit(1)


# Main execution
if __name__ == '__main__':
    url = 'https://oceanparcels.org/articles.html'
    scrape_articles(url)
