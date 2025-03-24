// Handle search on "Search" button click
document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    const source = document.getElementById('source-select').value;
    const lang = document.getElementById('language-select').value;
    if (query) {
        if (source === 'wikipedia') {
            fetchWikipediaArticle(query, lang);
        } else if (source === 'wikisource') {
            fetchWikisourceArticle(query, lang);
        } else if (source === 'wikibooks') {
            fetchWikibooksArticle(query, lang);
        } else if (source === 'wiktionary') {
            fetchWiktionaryArticle(query, lang);
        } else if (source === 'wikinews') {
            fetchWikinewsArticle(query, lang);
        }
    }
});

// Handle search on "Enter" key press
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        const source = document.getElementById('source-select').value;
        const lang = document.getElementById('language-select').value;
        if (query) {
            if (source === 'wikipedia') {
                fetchWikipediaArticle(query, lang);
            } else if (source === 'wikisource') {
                fetchWikisourceArticle(query, lang);
            } else if (source === 'wikibooks') {
                fetchWikibooksArticle(query, lang);
            } else if (source === 'wiktionary') {
                fetchWiktionaryArticle(query, lang);
            } else if (source === 'wikinews') {
                fetchWikinewsArticle(query, lang);
            }
        }
    }
});

// Handle "Home" link click in the sidebar
document.getElementById('home-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('article-container').innerHTML = '';
    document.getElementById('search-input').value = '';
});

// Handle "Random Article" link click in the sidebar
document.getElementById('random-link').addEventListener('click', function (e) {
    e.preventDefault();
    const source = document.getElementById('source-select').value;
    const lang = document.getElementById('language-select').value;
    if (source === 'wikipedia') {
        fetchRandomWikipediaArticle(lang);
    } else if (source === 'wikisource') {
        fetchRandomWikisourceArticle(lang);
    } else if (source === 'wikibooks') {
        fetchRandomWikibooksArticle(lang);
    } else if (source === 'wiktionary') {
        fetchRandomWiktionaryArticle(lang);
    } else if (source === 'wikinews') {
        fetchRandomWikinewsArticle(lang);
    }
});

// Function to fetch a specific Wikipedia article
function fetchWikipediaArticle(title, lang) {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Article not found');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikipedia');
        })
        .catch(error => {
            console.error('Error fetching article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a random Wikipedia article
function fetchRandomWikipediaArticle(lang) {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/random/html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch random article');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikipedia');
        })
        .catch(error => {
            console.error('Error fetching random article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a specific Wikisource article
function fetchWikisourceArticle(title, lang) {
    const url = `https://${lang}.wikisource.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Article not found');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikisource');
        })
        .catch(error => {
            console.error('Error fetching article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a random Wikisource article
function fetchRandomWikisourceArticle(lang) {
    const url = `https://${lang}.wikisource.org/api/rest_v1/page/random/html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch random article');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikisource');
        })
        .catch(error => {
            console.error('Error fetching random article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a specific Wikibooks article
function fetchWikibooksArticle(title, lang) {
    const url = `https://${lang}.wikibooks.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Article not found');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikibooks');
        })
        .catch(error => {
            console.error('Error fetching article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a random Wikibooks article
function fetchRandomWikibooksArticle(lang) {
    const url = `https://${lang}.wikibooks.org/api/rest_v1/page/random/html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch random article');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikibooks');
        })
        .catch(error => {
            console.error('Error fetching random article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a specific Wiktionary article
function fetchWiktionaryArticle(title, lang) {
    const url = `https://${lang}.wiktionary.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Article not found');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wiktionary');
        })
        .catch(error => {
            console.error('Error fetching article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a random Wiktionary article
function fetchRandomWiktionaryArticle(lang) {
    const url = `https://${lang}.wiktionary.org/api/rest_v1/page/random/html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch random article');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wiktionary');
        })
        .catch(error => {
            console.error('Error fetching random article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a specific Wikinews article
function fetchWikinewsArticle(title, lang) {
    const url = `https://${lang}.wikinews.org/api/rest_v1/page/html/${encodeURIComponent(title)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Article not found');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikinews');
        })
        .catch(error => {
            console.error('Error fetching article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch a random Wikinews article
function fetchRandomWikinewsArticle(lang) {
    const url = `https://${lang}.wikinews.org/api/rest_v1/page/random/html`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch random article');
            }
            return response.text();
        })
        .then(html => {
            displayArticle(html, 'wikinews');
        })
        .catch(error => {
            console.error('Error fetching random article:', error);
            document.getElementById('article-container').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to display the article in the container
function displayArticle(html, source) {
    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML = html;

    // Apply the same style for all articles (Wikipedia and Wikinews)
    articleContainer.classList.add('wikisource'); // Use Wikisource/Wikinews style

    // Extract the infobox (if it exists)
    const infobox = articleContainer.querySelector('.infobox');
    if (infobox) {
        // Create a container for the infobox and text
        const contentWrapper = document.createElement('div');
        contentWrapper.style.overflow = 'hidden'; // Handle infobox floating

        // Move the infobox to the right
        infobox.style.float = 'right';
        infobox.style.marginLeft = '20px';
        infobox.style.marginBottom = '20px';

        // Clone the article content without the infobox
        const articleContent = document.createElement('div');
        articleContent.innerHTML = articleContainer.innerHTML.replace(infobox.outerHTML, '');

        // Add the infobox and content to the container
        contentWrapper.appendChild(infobox);
        contentWrapper.appendChild(articleContent);

        // Replace the article content with the new container
        articleContainer.innerHTML = '';
        articleContainer.appendChild(contentWrapper);
    }

    // Fix image URLs
    articleContainer.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            // Convert relative paths to absolute URLs
            if (src.startsWith('//')) {
                img.src = `https:${src}`;
            } else if (src.startsWith('/')) {
                img.src = `https://upload.wikimedia.org${src}`;
            }
        }

        // Add hover animation to images
        img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.02)';
            img.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        });

        // Handle image click
        img.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent click propagation
            openImageOverlay(img.src);
        });
    });

    // Intercept link clicks
    articleContainer.querySelectorAll('a').forEach(link => {
        if (link.href.startsWith('/')) {
            // Convert relative links to absolute links
            const lang = document.getElementById('language-select').value;
            if (source === 'wikipedia') {
                link.href = `https://${lang}.wikipedia.org${link.href}`;
            } else if (source === 'wikisource') {
                link.href = `https://${lang}.wikisource.org${link.href}`;
            } else if (source === 'wikibooks') {
                link.href = `https://${lang}.wikibooks.org${link.href}`;
            } else if (source === 'wiktionary') {
                link.href = `https://${lang}.wiktionary.org${link.href}`;
            } else if (source === 'wikinews') {
                link.href = `https://${lang}.wikinews.org${link.href}`;
            }
        }

        // Prevent default link behavior
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent redirection

            // Extract the article title from the link URL
            const url = new URL(link.href);
            const articleTitle = url.pathname.split('/').pop(); // Get the last part of the path

            // Fetch and display the new article
            const source = document.getElementById('source-select').value;
            const lang = document.getElementById('language-select').value;
            if (source === 'wikipedia') {
                fetchWikipediaArticle(articleTitle, lang);
            } else if (source === 'wikisource') {
                fetchWikisourceArticle(articleTitle, lang);
            } else if (source === 'wikibooks') {
                fetchWikibooksArticle(articleTitle, lang);
            } else if (source === 'wiktionary') {
                fetchWiktionaryArticle(articleTitle, lang);
            } else if (source === 'wikinews') {
                fetchWikinewsArticle(articleTitle, lang);
            }
        });
    });

    // Add a delay to trigger the animation
    setTimeout(() => {
        articleContainer.classList.add('visible'); // Apply the class to make content visible
    }, 100); // 100ms delay to allow the browser to load the content
}

// Function to open the image in inspection mode
function openImageOverlay(src) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');
    overlay.innerHTML = `<img src="${src}" alt="Enlarged Image">`;
    document.body.appendChild(overlay);

    // Activate the overlay with a smooth animation
    setTimeout(() => overlay.classList.add('active'), 10);

    // Handle image click to zoom in/out
    const img = overlay.querySelector('img');
    img.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent click propagation
        img.classList.toggle('zoomed');
    });

    // Handle click outside the image to close the overlay
    overlay.addEventListener('click', function () {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300); // Remove the overlay after the animation
    });
}

// Text-to-Speech (TTS) function
let speech = null;
let isTTSEnabled = false;

document.getElementById('tts-toggle').addEventListener('click', function () {
    const articleText = document.getElementById('article-container').innerText;
    const ttsButton = document.getElementById('tts-toggle');
    const targetLang = document.getElementById('translate-select').value;

    if (!isTTSEnabled) {
        // Enable TTS
        speech = new SpeechSynthesisUtterance(articleText);
        speech.lang = targetLang; // Use the selected language for translation
        window.speechSynthesis.speak(speech);
        ttsButton.textContent = 'Disable TTS';
        isTTSEnabled = true;
    } else {
        // Disable TTS
        window.speechSynthesis.cancel();
        ttsButton.textContent = 'Enable TTS';
        isTTSEnabled = false;
    }
});

// Translation function using LibreTranslate with API key
document.getElementById('translate-button').addEventListener('click', function () {
    const targetLang = document.getElementById('translate-select').value;
    const articleText = document.getElementById('article-container').innerText;
    const apiKey = document.getElementById('api-key-input').value;
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!apiKey) {
        alert('Please enter a LibreTranslate API key.');
        return;
    }

    // Show loading indicator
    loadingIndicator.style.display = 'block';

    // Use LibreTranslate API with API key
    const url = 'https://libretranslate.com/translate';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: articleText,
            source: 'auto',
            target: targetLang,
            api_key: apiKey,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.translatedText) {
                // Replace only the text, not the entire HTML content
                document.getElementById('article-container').innerText = data.translatedText;
            } else {
                console.error('Translation error: invalid response', data);
                alert('Error during translation. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during translation:', error);
            alert('Error during translation. Please try again.');
        })
        .finally(() => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        });
});