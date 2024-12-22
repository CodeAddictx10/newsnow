<?php

namespace App\Enums;

enum NewsSourceEnum: string
{
    case THE_GUARDIANS = 'theguardians';
    case NEWSORG = 'newsorg';
    case NEWYORKTIMES = 'newyorktimes';

    public static function all(): array
    {
        return array_column(self::cases(), 'value');
    }
}
