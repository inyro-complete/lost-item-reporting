package org.complete.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.complete.config.jwt.TokenProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter { // 요청(Request) 하나당 한 번만 실행되는 필터
    private final TokenProvider tokenProvider;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("=== [TokenAuthenticationFilter] 필터 진입 ===");

        String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);
        System.out.println("Authorization Header: " + authorizationHeader);

        String token = getAccessToken(authorizationHeader);
        System.out.println("Access Token: " + token);

        if(tokenProvider.validToken(token)) {
            System.out.println("토큰 유효함");

            Authentication authentication = tokenProvider.getAuthentication(token);
            System.out.println("Authentication 객체: " + authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("SecurityContext에 Authentication 설정 완료");
        } else {
            System.out.println("토큰 유효하지 않음");
        }

        filterChain.doFilter(request, response);
    }


    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }
}