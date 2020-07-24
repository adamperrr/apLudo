import json

class Gameplay:
    # Private constants
    __PAWN_NOT_ON_THE_BOARD_STATUS = -1
    __PAWN_AT_THE_FINISH_LINE_STATUS = -2
    __PAWN_INDEX_TO_COLOR = ['blue', 'yellow', 'red', 'green', 'watcher']
    __PAWN_COLOR_TO_INDEX = {'blue': 0, 'yellow': 1, 'red': 2, 'green': 3, 'watcher': 4}
    __BOARD_FIELDS_DESC = {
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
    __EMPTY_PLAYER_PAWNS = [__PAWN_NOT_ON_THE_BOARD_STATUS, __PAWN_NOT_ON_THE_BOARD_STATUS, __PAWN_NOT_ON_THE_BOARD_STATUS, __PAWN_NOT_ON_THE_BOARD_STATUS]
    __EMPTY_BOARD = {
        'pawns': {
        },
        'user_playing_color': None,
        'prev_added_color': None,
        'prev_number': 0,
    }

    # Private variables
    __board = __EMPTY_BOARD
    __prev_added_color = __PAWN_INDEX_TO_COLOR[0]

    def __init__(self, init_board_json=None):
        if init_board_json is None:
            # self.__last_added_color = self.__PAWN_INDEX_TO_COLOR[0] # moved to variable declaration
            self.__board['pawns'][self.__prev_added_color] = self.__EMPTY_PLAYER_PAWNS
        else:
            # TODO: checking if init_board is ok
            self.__board = json.loads(init_board_json)
            last_pawn_index = len(self.__board['pawns']) - 1
            self.__last_added_color = self.__PAWN_INDEX_TO_COLOR[ last_pawn_index ]

    def add_player(self, player_index, is_game_started):
        color = self.__PAWN_INDEX_TO_COLOR[4]
        is_player = player_index < 4 and (not is_game_started)
        if is_player:
            color = self.__PAWN_INDEX_TO_COLOR[player_index]
            self.__board['pawns'][color] = self.__EMPTY_PLAYER_PAWNS
        self.__prev_added_color = color

        return color, is_player

    def get_board(self):
        # print("get_board():", self.__board)
        return self.__board

    def get_json_board(self):
        board_json = json.dumps(self.__board)
        # print("get_json_board():", board_json)
        return board_json

    def get_prev_added_color(self):
        # print("get_prev_added_color():", self.__prev_added_color)
        return self.__prev_added_color

    def get_prev_added_color_index(self):
        color_index = self.__PAWN_COLOR_TO_INDEX[self.__prev_added_color]
        # print("get_prev_added_color_index():", color_index)
        return color_index
