export const applicationProtocol = 'http:'
export const applicationHost = '127.0.0.1'
export const applicationPort = '8000'

export const applicationPrl = '//' + applicationHost + ':' + applicationPort // PRL - Protocol-relative URLs
export const applicationUrl = applicationProtocol + applicationPrl
export const wsRoomUrlPattern = 'ws:' + applicationPrl + '/ws/room'