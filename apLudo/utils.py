PAWN_NOT_ON_THE_BOARD_STATUS = -1
PAWN_AT_THE_FINISH_LINE_STATUS = -2
PAWN_INDEX_TO_COLOR = ['blue', 'yellow', 'red', 'green', 'watcher']
PAWN_COLOR_TO_INDEX = {'blue': 0, 'yellow': 1, 'red': 2, 'green': 3, 'watcher': 4}
BOARD_FIELDS_DESC = {  # according to board prepared by Domi
    'blue': {
        'start_field': 3,
        'stop_field': 2,
    },
    'yellow': {
        'start_field': 13,
        'stop_field': 12,
    },
    'red': {
        'start_field': 23,
        'stop_field': 22,
    },
    'green': {
        'start_field': 33,
        'stop_field': 32,
    },
}

EMPTY_PLAYER_PAWNS = [PAWN_NOT_ON_THE_BOARD_STATUS, PAWN_NOT_ON_THE_BOARD_STATUS, PAWN_NOT_ON_THE_BOARD_STATUS, PAWN_NOT_ON_THE_BOARD_STATUS]

EMPTY_BOARD = {
    'pawns': {
    },
    'user_playing_color': None,
}