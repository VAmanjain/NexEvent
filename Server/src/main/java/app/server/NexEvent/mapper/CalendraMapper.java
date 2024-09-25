package app.server.NexEvent.mapper;

import app.server.NexEvent.dtos.CalendarDto;
import app.server.NexEvent.entitites.Calendars;
import app.server.NexEvent.entitites.UserProfile;

public class CalendraMapper {
    public static Calendars mapToCalendra (CalendarDto calendarDto){
        return Calendars.builder()
                .id(calendarDto.getId())
                .cal_name(calendarDto.getCal_name())
                .ownerName(calendarDto.getOwnerName())
                .userProfile(UserProfile.builder().id(calendarDto.getUserProfileId()).build())
                .events(calendarDto.getEvents())
                .build();
    }

//    public static CalendarDto mapToCalendarDto (Calendars calendars){
//        return CalendarDto.builder()
//                .id(calendars.getId())
//                .cal_name(calendars.getCal_name())
//                .events(calendars.getEvents())
//                .ownerName(calendars.getOwnerName())
//                .userProfileId(calendars.getUserProfile())
//                .build();
//    }
        public static CalendarDto mapToCalendarDto (Calendars calendars){
            return CalendarDto.builder()
                    .id(calendars.getId())
                    .cal_name(calendars.getCal_name())
                    .events(calendars.getEvents())
                    .ownerName(calendars.getOwnerName())
                    .userProfileId(calendars.getUserProfile().getId())
                    .build();
        }


}
