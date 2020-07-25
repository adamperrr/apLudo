export const applicationProtocol = 'http:'
export const applicationHost = '127.0.0.1'
export const applicationPort = '8000'

export let applicationPrl = '//' + applicationHost + ':' + applicationPort // PRL - Protocol-relative URLs
export let applicationUrl = applicationProtocol + applicationPrl
export let wsRoomUrlPattern = 'ws:' + applicationPrl + '/ws/room'