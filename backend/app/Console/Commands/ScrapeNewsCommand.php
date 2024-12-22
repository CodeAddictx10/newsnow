<?php

namespace App\Console\Commands;

use App\Services\NewsAggregatorService;
use Illuminate\Console\Command;

class ScrapeNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:scrape';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape and process news from various sources';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting news scraping...');

        try {

            $newsAggregator = new NewsAggregatorService();
            $newsAggregator->scrapeNews();

            $this->info('News scraping completed successfully!');
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
        }
    }
}
